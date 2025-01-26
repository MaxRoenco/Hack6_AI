from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import requests
from urllib.parse import urlparse
import re
import json
import os
from dotenv import load_dotenv
import openai
from typing import List, Dict, Any

# Load environment variables from .env file
load_dotenv()

app = FastAPI()


# ========== Pydantic Models ==========
class DataRequest(BaseModel):
    data: str


class BiasAnalysisItem(BaseModel):
    text: str
    bias_type: str
    severity: str
    neutral_version: str
    reason: str


class BiasAnalysisResponse(BaseModel):
    bias_intensity: str
    bias_types_amount: str
    bias_score: float
    sentences: List[BiasAnalysisItem]


class ProcessResponse(BaseModel):
    NLP: List[Dict[str, Any]]
    BiasAnalysis: BiasAnalysisResponse


# ========== Configuration ==========
ZETTA_API_KEY = os.getenv("ZETTA_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not ZETTA_API_KEY or not OPENAI_API_KEY:
    raise ValueError("API keys are not set in the environment variables.")

# Load JSON data from file
with open("data.json", "r") as file:
    json_data = json.load(file)

# Initialize OpenAI API
openai.api_key = OPENAI_API_KEY


# ========== Middleware ==========
@app.middleware("http")
async def add_custom_header(request: Request, call_next):
    response = await call_next(request)
    response.headers["Content-Type"] = "application/json; charset=utf-8"
    return response


# ========== Helper Functions ==========
def get_score(sentence: str) -> List[float]:
    scores = [0.0] * 8
    for word in re.findall(r'\b\w+\b', sentence.lower()):
        for entry in json_data:
            if entry['keyword'] == word:
                scores[0] += entry['anchoring']
                scores[1] += entry['confirmation']
                scores[2] += entry['negativity']
                scores[3] += entry['bandwagon']
                scores[4] += entry['authority']
                scores[5] += entry['framing_effect']
                scores[6] += entry['attribution']
                scores[7] += entry['halo_effect']
    return scores


def splitter(raw_article: str) -> List[Dict[str, Any]]:
    article = []
    for paragraph in raw_article.split('\n'):
        paragraph = paragraph.strip()
        if not paragraph or len(paragraph.split()) <= 10:
            continue
        sentences = []
        for sentence in re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s', paragraph):
            score = get_score(sentence)
            if any(score):
                sentences.append({"text": sentence, "score": score})
        article.append({"sentences": sentences, "text": paragraph})
    return article


async def analyze_bias(processed_text: List[Dict[str, Any]]) -> Dict[str, Any]:
    json_schema = {
        "type": "object",
        "properties": {
            "bias_intensity": {"type": "string"},
            "bias_types_amount": {"type": "string"},
            "bias_score" : {"type": "number"},
            "sentences": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "text": {"type": "string"},
                        "bias_type": {"type": "string"},
                        "severity": {"type": "string"},
                        "neutral_version": {"type": "string"},
                        "reason": {"type": "string"}
                    },
                    "required": ["text", "bias_type", "severity", "neutral_version", "reason"]
                }
            }
        },
        "required": ["bias_intensity", "bias_types_amount", "bias_score", "sentences"]
    }

    user_content = []
    for idx, para in enumerate(processed_text):
        # Start with paragraph header
        entry = f"Paragraph {idx + 1}:\n"

        # Add sentences if they exist
        if para['sentences']:
            entry += "Sentences:\n" + "\n".join(f"- {sent['text']}" for sent in para['sentences'])
        # Always add full paragraph text
        entry += f"\nFull Paragraph Text:\n{para['text']}"

        user_content.append(entry)

    user_content = "\n\n".join(user_content)

    response = await openai.ChatCompletion.acreate(
        model="gpt-4",
        messages=[
            {"role": "system",
             "content": "Analyze the text for bias and provide output in valid JSON format. Use proper escaping for quotes and special characters. Maintain original text language for 'text' and 'neutral_version' fields. Do NOT include sentences that have no 'bias_type', and do NOT forget to note the severity.  Focus on these bias types, the score of each sentence attributes to the bias type as they are shown here: anchoring bias, confirmation bias, negativity bias, bandwagon bias, authority bias, framing effect, attribution bias, halo effect. When dealing with data in ROMANIAN or RUSSIAN, look the paragraphs and all 'text' fields for biases, not based on the lists of sentences. Make sure you are a bit more severe with attributing a 'bias_score' and a 'bias_intensity'. The bias score is from 0 to 1 and it should NOT be related to the amount of bias types. 'bias_score' for 'low' should be around 0.3-0.45."},
            {"role": "user", "content": user_content}
        ],
        functions=[{"name": "analyze_bias", "parameters": json_schema}],
        function_call={"name": "analyze_bias"},
        temperature=0.0,
        top_p=0.0,
        seed=42
    )

    return json.loads(response['choices'][0]['message']['function_call']['arguments'])


# ========== API Endpoint ==========
@app.post("/api/process", response_model=ProcessResponse)
async def process(data_request: DataRequest):
    input_data = data_request.data
    parsed_url = urlparse(input_data)

    # Determine if input is a URL or text
    if parsed_url.scheme and parsed_url.netloc:
        # Handle URL input
        payload = {
            "content": "EMPTY",
            "contentUri": input_data,
            "language": "eng"
        }

        response = requests.post(
            "https://app.trustservista.com/api/rest/v2/text",
            json=payload,
            headers={
                "X-TRUS-API-Key": ZETTA_API_KEY,
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cache-Control": "no-cache"
            }
        )

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Error processing the URL")

        text = response.json().get("text", "")
    else:
        # Handle raw text input
        text = input_data

    processed_text = splitter(text)

    try:
        bias_analysis = await analyze_bias(processed_text)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Error parsing BiasAnalysis JSON: {str(e)}")

    return {
        "NLP": processed_text,
        "BiasAnalysis": bias_analysis
    }
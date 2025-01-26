from fastapi import FastAPI, HTTPException
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

class DataRequest(BaseModel):
    data: str

# Load API keys from environment variables
ZETTA_API_KEY = os.getenv("ZETTA_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not ZETTA_API_KEY or not OPENAI_API_KEY:
    raise ValueError("API keys are not set in the environment variables.")

# Load JSON data from a file
file_path = "data.json"

# Open and load the JSON file
with open(file_path, "r") as file:
    json_data = json.load(file)

# Initialize OpenAI API
openai.api_key = OPENAI_API_KEY

# 0 - anchoring, 1 - confirmation, 2 - negativity, 3 - bandwagon, etc.
def get_score(sentence):
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

def splitter(raw_article):
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
    # Define the JSON schema for the expected output
    json_schema = {
        "type": "object",
        "properties": {
            "bias_intensity": {"type": "string"},
            "bias_types_amount": {"type": "string"},
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
        "required": ["bias_intensity", "bias_types_amount", "sentences"]
    }

    # Construct the user content from processed_text
    user_content = "\n".join(
        f"Paragraph {idx + 1}:\n" + "\n".join(f"{sent['text']}" for sent in para['sentences'])
        for idx, para in enumerate(processed_text)
    )

    # Make the API call with the defined schema
    response = await openai.ChatCompletion.acreate(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Analyze the following text for bias and provide the output in the specified JSON format. Do NOT create json objects of sentences that have no bias. Do not limit yourself to only the sentences that got evaluated, they have to be double checked, but also check each sentence from each paragraph. Also, if the source is another language only the 'text' and 'neutral_version' should be kept in the language of the article, the rest is in english."},
            {"role": "user", "content": user_content}
        ],
        functions=[
            {
                "name": "analyze_bias",
                "parameters": json_schema
            }
        ],
        function_call={"name": "analyze_bias"},
        temperature = 0.0,  # Set temperature to 0 for deterministic output
        top_p = 0.0,  # Set top_p to 0 to limit randomness
        seed = 42  # Set a fixed seed for reproducibility
    )

    # Extract and return the structured response
    structured_response = response['choices'][0]['message']['function_call']['arguments']
    return structured_response

@app.post("/api/process")
async def process(data_request: DataRequest):
    url = data_request.data

    parsed_url = urlparse(url)
    if not parsed_url.scheme or not parsed_url.netloc:
        raise HTTPException(status_code=400, detail="Invalid URL")

    payload = {
        "content": "EMPTY",
        "contentUri": url,
        "language": "eng"
    }

    API_ENDPOINT_TEXT = "https://app.trustservista.com/api/rest/v2/text"
    HEADERS = {
        "X-TRUS-API-Key": ZETTA_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Cache-Control": "no-cache"
    }

    response = requests.post(API_ENDPOINT_TEXT, json=payload, headers=HEADERS)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error processing the URL")

    response_data = response.json()
    text = response_data.get("text", "")

    processed_text = splitter(text)

    bias_analysis = await analyze_bias(processed_text)


    return {"NLP": processed_text, "BiasAnalysis": bias_analysis}

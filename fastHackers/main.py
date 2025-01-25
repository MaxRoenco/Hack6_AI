from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from urllib.parse import urlparse
import re
import json

app = FastAPI()

class DataRequest(BaseModel):
    data: str

# Load JSON data from a file
file_path = "data.json"

# Open and load the JSON file
with open(file_path, "r") as file:
    json_data = json.load(file)

# 0 - anchoring, 1- confirmation, 2 - negativity, 3 - bandwagon, 4 - authority, 5 - framing_effect, 6 - attribution, 7 - halo_effect
def get_score(sentence):
    scores = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
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
        # Remove leading and trailing whitespace
        paragraph = paragraph.strip()
        # Skip empty paragraphs or those with 10 or fewer words
        if not paragraph or len(paragraph.split()) <= 10:
            continue
        sentences = []
        for sentence in re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s', paragraph):
            score = get_score(sentence)
            # Include the sentence if any score is non-zero
            if any(score):
                sentences.append({"text": sentence, "score": score})
        # Include the paragraph even if all sentences have zero scores
        article.append({"sentences": sentences, "text": paragraph})

    return article



@app.post("/api/process")
async def process(data_request: DataRequest):
    url = data_request.data

    # Validate the URL
    parsed_url = urlparse(url)
    if not parsed_url.scheme or not parsed_url.netloc:
        raise HTTPException(status_code=400, detail="Invalid URL")

    # Prepare the payload for the external API
    payload = {
        "content": "EMPTY",
        "contentUri": url,
        "language": "eng"
    }

    # Define the API endpoint and headers
    API_ENDPOINT_TEXT = "https://app.trustservista.com/api/rest/v2/text"
    API_KEY = "f6861bb87cc6c71f90b436fc94515651"  # Replace with your actual API key
    HEADERS = {
        "X-TRUS-API-Key": API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Cache-Control": "no-cache"
    }

    # Make the POST request to the external API
    response = requests.post(API_ENDPOINT_TEXT, json=payload, headers=HEADERS)

    # Check if the request was successful
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error processing the URL")

    # Extract the text from the response
    response_data = response.json()
    text = response_data.get("text", "")

    # Process the text using the splitter function
    processed_text = splitter(text)

    # Return the processed text
    return {"NLP": processed_text}

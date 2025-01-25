from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from urllib.parse import urlparse

app = FastAPI()

class DataRequest(BaseModel):
    data: str

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

    # Return the response from the external API
    return response.json()

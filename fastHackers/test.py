import requests

# Replace these with your Azure details
endpoint = "https://biasextractor.cognitiveservices.azure.com/"
api_key = "6FLKSLUndDTBj9YzJ06ks21pTI02HT0qzF9qLkKc30fZBeUMEpD0JQQJ99BAACPV0roXJ3w3AAAaACOG4j69"


# Function to classify text
def classify_text(sentence):
    headers = {
        "Ocp-Apim-Subscription-Key": api_key,
        "Content-Type": "application/json"
    }
    payload = {
        "kind": "CustomSingleLabelClassification",
        "parameters": {
            "projectName": "YourProjectName",  # Replace with your project name
            "deploymentName": "YourDeploymentName",  # Replace with your deployment name
            "stringIndexType": "TextElement_V8"
        },
        "analysisInput": {
            "documents": [
                {"id": "1", "text": sentence}
            ]
        }
    }

    # Send POST request to Azure API
    response = requests.post(endpoint, headers=headers, json=payload)

    # Check if the request was successful
    if response.status_code == 200:
        result = response.json()
        classification = result["classifications"][0]
        confidence = classification["confidenceScore"]
        category = classification["category"]
        return f"{confidence:.5f} : {category} : {sentence}"
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None


# Test the function
sentence = "Experts say this is the best method for success."
result = classify_text(sentence)
if result:
    print(result)

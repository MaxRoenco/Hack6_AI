import requests
import re
import json

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


raw_article = "Hegseth, a former Fox News host and author who served in the Army National Guard and deployed to Iraq and Afghanistan, was an unconventional and controversial pick to lead the Pentagon. He faced criticism for comments he made about the role of women in combat and the military’s diversity initiatives. He’s also been accused of sexual assault, financial mismanagement and excessive alcohol use — allegations which he’s denied. Some lawmakers also questioned his ability to lead an organization as massive as the Defense Department.\nAdvancing the DOD’s arsenal of AI and uncrewed platforms was also a top military modernization priority for the Biden administration. The Trump administration seems poised to accelerate that push."


def splitter(raw_article):
    article = []
    for paragraph in raw_article.split('\n'):
        sentences =[]
        for sentence in re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s', paragraph):
            score = get_score(sentence)
            sentences.append({"text": sentence, "score": score})

        article.append({"sentences": sentences, "text": paragraph})

    return article


proc_article = splitter(raw_article)
print(proc_article)














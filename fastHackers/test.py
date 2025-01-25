import requests
import re


def get_score(sentence):
    return [0.0, 0.0, 0.0, 0.0, 0.0]


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


article = splitter(raw_article)
print(article[0].get('sentences')[0].get('score')[1])














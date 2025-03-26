import openai
import os

from dotenv import load_dotenv
from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory storage for demonstration purposes
data_store = ["haha", "hehe"]
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


client = openai.OpenAI()


@app.route("/askchat", methods=["POST"])
def call_openai():
    data = request.json
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": "Jesteś przyjaznym, kompetentnym, wydajnym, młodym i profesjonalnym asystentem dla lokalnych usług rządowych. Podaj dokładne informacje i bądź angażujący.",
            },
            {"role": "user", "content": data.get("prompt")},
        ],
    )
    print(completion)
    return jsonify(completion.choices[0].message.content), 200


@app.route("/askchatwebsearch", methods=["POST"])
def call_openai_web():
    data = request.json
    completion = client.chat.completions.create(
        model="gpt-4o-search-preview",
        messages=[
            {
                "role": "system",
                "content": "Jesteś przyjaznym, kompetentnym, wydajnym, młodym i profesjonalnym asystentem dla lokalnych usług rządowych. Podaj dokładne informacje i bądź angażujący.",
            },
            {"role": "user", "content": data.get("prompt")},
        ],
    )
    print(completion)
    return jsonify(completion.choices[0].message.content), 200

@app.route('/old', methods=['POST'])
def call_old():
    data = request.json
    completion = client.chat.completions.create(
        model="gpt-4o-search-preview",
        messages=[
            {
                "role": "system",
                "content": "Jesteś asystentem przyjaznym, kompetentnym, wydajnym, młodym i profesjonalnym asystentem dla lokalnych usług rządowych. Podaj dokładne informacje i bądź angażujący."
            },
            {
                "role": "user",
                "content": data.get("prompt")
            }
        ]
    )
    print(completion)
    return jsonify(completion.choices[0].message.content), 200

@app.route('/young', methods=['POST'])
def call_young():
    data = request.json
    completion = client.chat.completions.create(
        model="gpt-4o-search-preview",
        messages=[
            {
                "role": "system",
                "content": "Jesteś asystentem przyjaznym, kompetentnym, wydajnym, młodym i profesjonalnym asystentem dla lokalnych usług rządowych. Podaj dokładne informacje i bądź angażujący."
            },
            {
                "role": "user",
                "content": data.get("prompt")
            }
        ]
    )
    print(completion)
    return jsonify(completion.choices[0].message.content), 200

@app.route('basic', methods=['POST'])
def call_basic():
    data = request.json
    completion = client.chat.completions.create(
        model="gpt-4o-search-preview",
        messages=[
            {
                "role": "system",
                "content": "Jesteś asystentem przyjaznym, kompetentnym, wydajnym, młodym i profesjonalnym asystentem dla lokalnych usług rządowych. Podaj dokładne informacje i bądź angażujący."
            },
            {
                "role": "user",
                "content": data.get("prompt")
            }
        ]
    )
    print(completion)
    return jsonify(completion.choices[0].message.content), 200
if __name__ == "__main__":
    app.run(debug=True)

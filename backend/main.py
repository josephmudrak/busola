import dotenv
from flask import Flask, request, jsonify
import openai
from dotenv import load_dotenv
import os

app = Flask(__name__)

# In-memory storage for demonstration purposes
data_store = ["haha", "hehe"]
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/items', methods=['GET'])
def get_items():
    return jsonify(data_store)

@app.route('/items', methods=['POST'])
def add_item():
    item = request.json
    data_store.append(item)
    return jsonify(item), 201


from openai import OpenAI

client = OpenAI()

@app.route('/askchat', methods=['POST'])
def call_openai():
    data = request.json
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": data.get("prompt")
            }
        ]
    )
    print(completion)
    return jsonify(completion.choices[0].message.content), 200

if __name__ == '__main__':
    app.run(debug=True)
import openai
import os

from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

import json

app = Flask(__name__)
CORS(app)

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
client = openai.OpenAI()

def get_weather(location):
    # Placeholder implementation
    return f"The current temperature in {location} is 25°C."

def call_openai_with_tools(prompt, tools, model="gpt-4o"):
    completion = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "system",
                "content": "Jesteś asystentem przyjaznym, kompetentnym, wydajnym, młodym i profesjonalnym asystentem dla lokalnych usług rządowych. Podaj dokładne informacje i bądź angażujący."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        tools=tools
    )
    tool_call = completion.choices[0].message.tool_calls[0]
    return tool_call.to_dict()  # Convert to dictionary

@app.route('/old', methods=['POST'])
def call_old():
    data = request.json
    tools = [{
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Zwróć aktualną temperaturę dla podanej lokalizacji.",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "City and country e.g. Bogotá, Colombia"
                    }
                },
                "required": ["location"],
                "additionalProperties": False
            },
            "strict": True
        }
    }]
    response = call_openai_with_tools(data.get("prompt"), tools)
    # Extract the function name and arguments
    function_name = response["function"]["name"]
    arguments = json.loads(response["function"]["arguments"])
    result = 0
    # Call the function with the extracted arguments
    if function_name == "get_weather":
        location = arguments["location"]
        result = get_weather(location)
        print(result)
    return result, 200

@app.route('/young', methods=['POST'])
def call_young():
    data = request.json
    tools = [{
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Zwróć aktualną temperaturę dla podanej lokalizacji.",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "City and country e.g. Bogotá, Colombia"
                    }
                },
                "required": ["location"],
                "additionalProperties": False
            },
            "strict": True
        }
    }]
    response = call_openai_with_tools(data.get("prompt"), tools)
    # Extract the function name and arguments
    function_name = response["function"]["name"]
    arguments = json.loads(response["function"]["arguments"])
    result = 0
    # Call the function with the extracted arguments
    if function_name == "get_weather":
        location = arguments["location"]
        result = get_weather(location)
        print(result)
    return result, 200

@app.route('/basic', methods=['POST'])
def call_basic():
    data = request.json
    tools = [{
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Zwróć aktualną temperaturę dla podanej lokalizacji.",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "City and country e.g. Bogotá, Colombia"
                    }
                },
                "required": ["location"],
                "additionalProperties": False
            },
            "strict": True
        }
    }]
    response = call_openai_with_tools(data.get("prompt"), tools)
    # Extract the function name and arguments
    function_name = response["function"]["name"]
    arguments = json.loads(response["function"]["arguments"])
    result = 0
    # Call the function with the extracted arguments
    if function_name == "get_weather":
        location = arguments["location"]
        result = get_weather(location)
        print(result)
    return result, 200

def call_openai(prompt):
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": "Jesteś asystentem przyjaznym, kompetentnym, wydajnym, młodym i profesjonalnym asystentem dla lokalnych usług rządowych. Podaj dokładne informacje i bądź angażujący."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    print(completion)
    return jsonify(completion.choices[0].message.content), 200


def call_openai_web(prompt):
    completion = client.chat.completions.create(
        model="gpt-4o-search-preview",
        messages=[
            {
                "role": "system",
                "content": "Jesteś asystentem przyjaznym, kompetentnym, wydajnym, młodym i profesjonalnym asystentem dla lokalnych usług rządowych. Podaj dokładne informacje i bądź angażujący."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    print(completion)
    return jsonify(completion.choices[0].message.content), 200

if __name__ == "__main__":
    app.run(debug=True)
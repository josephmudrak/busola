import openai
import os

from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

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
                "content": "Jesteś asystentem przyjaznym, kompetentnym, wydajnym, młodym i profesjonalnym asystentem dla lokalnych usług rządowych. Podaj dokładne informacje i bądź angażujący.",
            },
            {"role": "user", "content": prompt},
        ],
        tools=tools,
    )
    tool_call = completion.choices[0].message.tool_calls[0]
    return tool_call.to_dict()  # Convert to dictionary


@app.route("/old", methods=["POST"])
def call_old():
    data = request.json
    tools = [
        {
            "type": "function",
            "function": {
                "name": "get_weather",
                "description": "Zwróć aktualną temperaturę dla podanej lokalizacji.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "location": {
                            "type": "string",
                            "description": "City and country e.g. Bogotá, Colombia",
                        }
                    },
                    "required": ["location"],
                    "additionalProperties": False,
                },
                "strict": True,
            },
        }
    ]
    response = call_openai_with_tools(data.get("prompt"), tools)
    return jsonify(response), 200


@app.route("/young", methods=["POST"])
def call_young():
    data = request.json
    tools = [
        {
            "type": "function",
            "function": {
                "name": "get_weather",
                "description": "Get current temperature for a given location.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "location": {
                            "type": "string",
                            "description": "City and country e.g. Bogotá, Colombia",
                        }
                    },
                    "required": ["location"],
                    "additionalProperties": False,
                },
                "strict": True,
            },
        }
    ]
    response = call_openai_with_tools(data.get("prompt"), tools)
    return jsonify(response), 200


@app.route("/basic", methods=["POST"])
def call_basic():
    data = request.json
    tools = [
        {
            "type": "function",
            "function": {
                "name": "get_weather",
                "description": "Get current temperature for a given location.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "location": {
                            "type": "string",
                            "description": "City and country e.g. Bogotá, Colombia",
                        }
                    },
                    "required": ["location"],
                    "additionalProperties": False,
                },
                "strict": True,
            },
        }
    ]
    response = call_openai_with_tools(data.get("prompt"), tools)
    return jsonify(response), 200


if __name__ == "__main__":
    app.run(debug=True)

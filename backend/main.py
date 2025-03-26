import datetime
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

#young
#######################
def get_stypedium(prompt):
    result = call_openai_web(prompt+" Odpowiedz możliwie jak najkrocej na podstawie strony https://uml.lodz.pl/edukacja/stypendia/ podawaj linki źrodła")
    return result

def get_inicjatywy(prompt):
    result = call_openai_web(
        prompt+"Odpowiedz możliwie jak najkrocej na podstawie strony https://mlodziwlodzi.pl/inicjatywy/ podawaj linki źrodła")
    return result

def get_wydarzenia(prompt):
    result = call_openai_web(
        prompt+"Odpowiedz możliwie jak najkrocej na podstawie stron https://www.centerko.org/, bierz pod uwagę tylko wydarzenia w łodzi oraz że ma nie brać wydarzeń które się odbyły a jest " + datetime.datetime.now().strftime("%Y-%m-%d")+ " podawaj linki źrodła")
    return result

def get_praca(prompt):
    result = call_openai_web(
        prompt+"Odpowiedz możliwie jak najkrocej na podstawie strony https://dlamlodych.praca.gov.pl/o-programie, bierz pod uwagę tylko oferty pracy w łodzi podawaj linki źrodła")
    return result
#######################
#old
def get_swiadczenia(prompt):
    result = call_openai_web(prompt+"Odpowiedz możliwie jak najkrocej na podstawie strony https://uml.lodz.pl/seniorzy/projekty/ koniecznie podawaj linki źrodła na końcu odpowiedzi bierz pod uwagę informacje z miasta Łódź")
    return result
def get_opieka(prompt):
    result = call_openai_web(prompt+"Odpowiedz możliwie jak najkrocej na podstawie strony https://www.gdziepolek.pl/wykaz-darmowych-lekow-dla-seniorow , https://pacjent.gov.pl/internetowe-konto-pacjenta podawaj linki źrodła")
    return result

#######################
def get_mieszkalnictwo(prompt):
    result = call_openai_web(prompt+"Odpowiedz możliwie jak najkrocej na podstawie strony https://uml.lodz.pl/dla-mieszkancow/mieszkalnictwo/ podawaj linki źrodła")
    return result
def get_pozwolenia(prompt):
    result = call_openai_web(prompt+"Odpowiedz możliwie jak najkrocej na podstawie strony https://bip.uml.lodz.pl/urzad-miasta/zalatw-sprawe-urzedowa/wyszukiwarka-spraw/nieruchomosci-lokale-geodezja/pozwolenia-na-budowe-i-rozbiorke/KA-01051/ podawaj linki źrodła")
    return result

def get_oplaty(prompt):
    result = call_openai_web(prompt+"Odpowiedz możliwie jak najkrocej na podstawie strony bierz pod uwagę informacje z miasta Łódź podawaj linki źrodła")
    return result
#######################

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
        tools=tools,
    )
    tool_call = completion.choices[0].message.tool_calls[0]
    return tool_call.to_dict()  # Convert to dictionary

@app.route('/old', methods=['POST'])
def call_old():
    data = request.json
    tools = [{
        "type": "function",
        "function": {
            "name": "get_swiadczenia",
            "description": "Zwróć informacje o świadczeniach",
                "additionalProperties": False
            },
        "strict": True
    },
        {
            "type": "function",
            "function": {
                "name": "get_opieka",
                "description": "Zwróć informacje o opiece zdrowotnej",
                "additionalProperties": False
            },
            "strict": True
        }]
    response = call_openai_with_tools(data.get("prompt"), tools)
    # Extract the function name and arguments
    function_name = response["function"]["name"]
    arguments = json.loads(response["function"]["arguments"])
    result = 0
    # Call the function with the extracted arguments
    if function_name == "get_swiadczenia":
        result = get_swiadczenia(data.get("prompt"))
        print("swiadczenia")
    elif function_name == "get_opieka":
        result = get_opieka(data.get("prompt"))
        print("opieka")
    print(result)
    return jsonify(result), 200

@app.route('/young', methods=['POST'])
def call_young():
    data = request.json
    tools = [{
        "type": "function",
        "function": {
            "name": "get_stypedium",
            "description": "Zwróć informacje o stypendium",
                "additionalProperties": False
            },
        "strict": True
    },
        {
            "type": "function",
            "function": {
                "name": "get_inicjatywy",
                "description": "Zwróć informacje o inicjatywach",
                "additionalProperties": False
            },
            "strict": True
        },
        {
            "type": "function",
            "function": {
                "name": "get_wydarzenia",
                "description": "Zwróć informacje o wydarzeniach",
                "additionalProperties": False
            },
            "strict": True
        },
        {
            "type": "function",
            "function": {
                "name": "get_praca",
                "description": "Zwróć informacje o pracy",
                "additionalProperties": False
            },
            "strict": True
        }
    ]
    response = call_openai_with_tools(data.get("prompt"), tools)
    # Extract the function name and arguments
    function_name = response["function"]["name"]
    arguments = json.loads(response["function"]["arguments"])
    result = 0
    # Call the function with the extracted arguments
    if function_name == "get_stypedium":
        result = get_stypedium(data.get("prompt"))
        print("stypendium")
    elif function_name == "get_inicjatywy":
        result = get_inicjatywy(data.get("prompt"))
        print("inicjatywy")
    elif function_name == "get_wydarzenia":
        result = get_wydarzenia(data.get("prompt"))
        print("wydarzenia")
    elif function_name == "get_praca":
        result = get_praca(data.get("prompt"))
        print("praca")
    print(result)
    return jsonify(result), 200

@app.route('/basic', methods=['POST'])
def call_basic():
    data = request.json
    tools = [{
        "type": "function",
        "function": {
            "name": "get_mieszkalnictwo",
            "description": "Zwróć informacje o mieszkalnictwie",
                "additionalProperties": False
            },
        "strict": True
    },
        {
            "type": "function",
            "function": {
                "name": "get_pozwolenia",
                "description": "Zwróć informacje o pozwolenia",
                "additionalProperties": False
            },
            "strict": True
        },
        {
            "type": "function",
            "function": {
                "name": "get_oplaty",
                "description": "Zwróć informacje o opłaty",
                "additionalProperties": False
            },
            "strict": True
        }]
    response = call_openai_with_tools(data.get("prompt"), tools)
    # Extract the function name and arguments
    function_name = response["function"]["name"]
    arguments = json.loads(response["function"]["arguments"])
    result = 0
    # Call the function with the extracted arguments
    if function_name == "get_mieszkalnictwo":
        result = get_mieszkalnictwo(data.get("prompt"))
        print("mieszkalnictwo")
    elif function_name == "get_pozwolenia":
        result = get_pozwolenia(data.get("prompt"))
        print("pozwolenia")
    elif function_name == "get_oplaty":
        result = get_oplaty(data.get("prompt"))
        print("oplaty")
    print(result)
    return jsonify(result), 200

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
                "content": "Przeszukaj podaną stronę streść informacje w 70 słowach. Dziel na możliwie jak najwięcej paragrafów, zawsze podawaj linki źrodła na końcu odpowiedzi bierz pod uwagę informacje z miasta Łódź."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
    )
    print(completion)
    return completion.choices[0].message.content

if __name__ == "__main__":
    app.run(debug=True)
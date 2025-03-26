from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory storage for demonstration purposes
data_store = ["haha", "hehe"]

@app.route('/items', methods=['GET'])
def get_items():
    return jsonify(data_store)

@app.route('/items', methods=['POST'])
def add_item():
    item = request.json
    data_store.append(item)
    return jsonify(item), 201

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "phi3"  # Change to mistral/gemma if needed

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "No message provided"}), 400
    
    response = requests.post(OLLAMA_URL, json={"model": MODEL, "prompt": user_input})
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(port=5000, debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route("/google-login", methods=["POST"])
def google_login():
    """Google Authentication"""
    data = request.json
    print("Received data:", data)  # Log the incoming data for debugging
    
    # Checking if the message exists in the data
    message = data.get("message")
    if not message:
        return jsonify({"message": "No message provided"}), 400

    # If message is found, return a success response
    return jsonify({"message": "Google login successful", "status": "Logged in"}), 200

if __name__ == "__main__":
    app.run(debug=True)

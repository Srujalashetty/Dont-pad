from flask import Flask, render_template, request, jsonify
# Flask        → creates the server
# render_template → sends HTML files to the browser
# request      → reads data sent from frontend (JS)
# jsonify      → sends JSON data back to frontend

app = Flask(__name__)
# Create a Flask application (your server)

# This dictionary stores all secret pads in memory
# Format: { "secret_key": "written text" }
pads = {}

@app.route("/")
def home():
    # When user opens http://127.0.0.1:5000/
    # Flask sends index.html
    return render_template("index.html")

@app.route("/pad")
def pad():
    # When user goes to /pad?key=secret
    # Flask sends the secret writing page
    return render_template("pad.html")

@app.route("/save", methods=["POST"])
def save_text():
    # This endpoint is called by JavaScript to SAVE text

    data = request.json
    # Read JSON sent from frontend

    key = data["key"]
    # Extract secret key

    text = data["text"]
    # Extract text user wrote

    pads[key] = text
    # Store text in memory using secret key

    return jsonify({"status": "saved"})
    # Send response back to frontend

@app.route("/load")
def load_text():
    # This endpoint is called by JavaScript to LOAD text

    key = request.args.get("key")
    # Read secret key from URL query (?key=abc)

    text = pads.get(key, "")
    # Get saved text for this key
    # If key doesn’t exist, return empty string

    return jsonify({"text": text})
    # Send text back to frontend as JSON

if __name__ == "__main__":
    # This ensures the server runs only when app.py is executed directly
    app.run(debug=True)
    # Start Flask server

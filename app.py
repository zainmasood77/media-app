from flask_cors import CORS
from flask import Flask, request, jsonify, send_from_directory
from PIL import Image
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
PROCESSED_FOLDER = "processed"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

@app.route('/')
def home():
    return "Backend is running!"

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    img = Image.open(filepath)
    img = img.resize((300, 300))

    processed_path = os.path.join(PROCESSED_FOLDER, file.filename)
    img.save(processed_path)

    return jsonify({
        "message": "Image uploaded and processed",
        "image_url": f"/processed/{file.filename}"
    })

@app.route('/processed/<filename>')
def get_processed_file(filename):
    return send_from_directory(PROCESSED_FOLDER, filename)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
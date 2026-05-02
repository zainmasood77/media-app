from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from PIL import Image
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
PROCESSED_FOLDER = "processed"

# Create folders if they don't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

@app.route('/')
def home():
    return "Backend is running!"

# Upload and process image
@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']

    # Save original image
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    # Open and resize image
    img = Image.open(filepath)
    img = img.resize((300, 300))

    # Save processed image
    processed_path = os.path.join(PROCESSED_FOLDER, file.filename)
    img.save(processed_path)

    return jsonify({
        "message": "Image uploaded and processed",
        "image_url": f"http://localhost:5000/image/{file.filename}"
    })

# Serve processed image to browser
@app.route('/image/<filename>')
def get_image(filename):
    return send_from_directory(PROCESSED_FOLDER, filename)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
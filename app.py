from flask_cors import CORS
from flask import Flask, request, jsonify, send_from_directory
from PIL import Image
import boto3
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
PROCESSED_FOLDER = "processed"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

BUCKET_NAME = "media-app-zain"
REGION = "us-east-1"
s3 = boto3.client('s3', region_name=REGION)

@app.route('/')
def home():
    return "Backend is running!"

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    filename = file.filename

    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    img = Image.open(filepath)
    img = img.resize((300, 300))
    processed_path = os.path.join(PROCESSED_FOLDER, filename)
    img.save(processed_path)

    s3.upload_file(filepath, BUCKET_NAME, f"uploads/{filename}")
    s3.upload_file(processed_path, BUCKET_NAME, f"processed/{filename}",
                   ExtraArgs={'ContentType': 'image/jpeg'})

    s3_processed_url = f"https://{BUCKET_NAME}.s3.{REGION}.amazonaws.com/processed/{filename}"

    return jsonify({
        "message": "Image uploaded and processed",
        "image_url": s3_processed_url,
        "s3_original": f"s3://{BUCKET_NAME}/uploads/{filename}",
        "s3_processed": f"s3://{BUCKET_NAME}/processed/{filename}"
    })

@app.route('/processed/<filename>')
def get_processed_file(filename):
    return send_from_directory(PROCESSED_FOLDER, filename)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

import os
import shutil
from dotenv import load_dotenv

load_dotenv()

from flask import Flask, request, jsonify
from embed import embed
from query import query
from get_vector_db import get_vector_db
from flask_cors import CORS

TEMP_FOLDER = os.getenv('TEMP_FOLDER', './_temp')
os.makedirs(TEMP_FOLDER, exist_ok=True)
chromafolder = './chroma'

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/embed', methods=['POST'])
def route_embed():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    embedded = embed(file)

    if embedded:
        return jsonify({"message": "File embedded successfully"}), 200

    return jsonify({"error": "File embedded unsuccessfully"}), 400

@app.route('/query', methods=['POST'])
def route_query():
    data = request.get_json()
    response = query(data.get('query'))

    if response:
        return jsonify({"message": response}), 200

    return jsonify({"error": "Something went wrong"}), 400

@app.route('/clear-vector-db', methods=['POST'])
def clear_vector_db():

    folder = chromafolder

    for filename in os.listdir(folder):
        if (filename == 'chroma.sqlite3'):
            continue
        file_path = os.path.join(folder, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.remove(file_path)  # Delete file or symbolic link
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)  # Delete directory and its contents
        except Exception as e:
            print(f'Failed to delete {file_path}. Reason: {e}')

    return jsonify({"message": "Vecctor DB was cleared succesfully!"}), 200


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)
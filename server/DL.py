import tensorflow as tf
from flask import Flask, request, jsonify
from tensorflow.keras.preprocessing import image as keras_image
from flask_cors import CORS
import numpy as np
import io
import logging

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the pre-trained model
try:
    model = tf.keras.models.load_model("C:/Users/anand/OneDrive/Documents/login_signup/server/model (1).h5")
    logger.info("Model loaded successfully.")
except Exception as e:
    logger.error("Error loading model: %s", str(e))
    model = None

def preprocess_image(image):
    try:
        img_array = keras_image.img_to_array(image)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0  # Normalize the image to [0, 1] range
        logger.info("Image preprocessing done.")
        return img_array
    except Exception as e:
        logger.error("Error in preprocessing image: %s", str(e))
        raise e

@app.route('/')
def index():
    return "Flask server is running"

@app.route('/predict', methods=['POST'])
def predict():
    logger.info("Prediction started.")
    if 'image' not in request.files:
        logger.error("No file part found in the request.")
        return jsonify({'error': 'No file part'}), 400

    file = request.files['image']

    if file.filename == '':
        logger.error("No selected file.")
        return jsonify({'error': 'No selected file'}), 400

    if file:
        try:
            file_like = io.BytesIO(file.read())
            logger.info("File found and converted to file-like object.")
            
            img = keras_image.load_img(file_like, target_size=(224, 224))
            logger.info("Image loaded successfully.")
            
            img_array = preprocess_image(img)
            logger.info("Preprocessed image array: %s", img_array)

            predicted_prob = model.predict(img_array)[0][0]
            logger.info("Predicted probability: %s", predicted_prob)
            
            predicted_class = 'Normal' if predicted_prob > 0.5 else 'Effusion'
            actual_class = predicted_class  # Assuming actual class is the same for this example
            logger.info("Predicted class: %s", predicted_class)

            return jsonify({'predicted_class': predicted_class, 'actual_class': actual_class})
        except Exception as e:
            logger.error("Error during prediction: %s", str(e))
            return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5002)

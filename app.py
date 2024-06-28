from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
model = joblib.load('restaurant_rating_model.pkl')

# Define all features used in the model (both relevant and irrelevant)
all_features = [
    'Country Code', 'City', 'Locality', 'Longitude', 'Latitude',
    'Cuisines', 'Average Cost for two', 'Currency', 'Has Table booking',
    'Has Online delivery', 'Is delivering now', 'Switch to order menu',
    'Price range', 'Rating color', 'Rating text', 'Votes'
]

# Define the relevant features for prediction
relevant_features = ['Average Cost for two', 'Price range', 'Votes']

# Default values for features not used in prediction
default_values = {
    'Country Code': 162,
    'City': 1,
    'Locality': 1,
    'Longitude': 77.209,
    'Latitude': 28.6139,
    'Cuisines': 1,
    'Currency': 1,
    'Has Table booking': 0,
    'Has Online delivery': 0,
    'Is delivering now': 0,
    'Switch to order menu': 0,
    'Rating color': 1,
    'Rating text': 1,
    'Votes': 300  # Default value for Votes as an example
}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        
        # Ensure all necessary features are present, using default values if needed
        input_data = {}
        for feature in all_features:
            if feature in data:
                input_data[feature] = data[feature]
            elif feature in default_values:
                input_data[feature] = default_values[feature]
        
        # Create a DataFrame from the input data
        input_df = pd.DataFrame([input_data])
        
        # Perform prediction using the model
        prediction = model.predict(input_df)
        
        return jsonify({'prediction': prediction[0]})
    
    except Exception as e:
        # Log the exception for debugging purposes
        app.logger.error(f"Prediction error: {str(e)}")
        return jsonify({'error': 'Failed to process the request.'}), 500

if __name__ == '__main__':
    app.run(debug=True)


# achieved this frontend for the relevant features an model acuuracy is also good and frontend features selection is also relevant

import React, { useState } from 'react';
import axios from 'axios';
import './PredictionForm.css'; // Import your CSS file for styling

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    "Average Cost for two": 1500,
    "Price range": 2,
    "Votes": 300
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false); // State to handle loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state while waiting for response
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
    setLoading(false); // Reset loading state after response
  };

  return (
    <div className="prediction-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="averageCost">Average Cost for two</label>
          <input
            type="number"
            id="averageCost"
            name="Average Cost for two"
            value={formData["Average Cost for two"]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priceRange">Price range</label>
          <input
            type="number"
            id="priceRange"
            name="Price range"
            value={formData["Price range"]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="votes">Votes</label>
          <input
            type="number"
            id="votes"
            name="Votes"
            value={formData["Votes"]}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Rating'}
        </button>
      </form>
      {prediction !== null && (
        <div className="prediction-result">
          <h2>Predicted Rating: {prediction}</h2>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;

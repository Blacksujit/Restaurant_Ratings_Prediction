import React from 'react';
import PredictionForm from './PredictionForm';
import './LandingPage.css'; // Import CSS file for styling

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="hero-section">
        <h1>Welcome to Restaurant Rating Predictor</h1>
        <p>Predict the ratings of restaurants based on various factors using our advanced ML model.</p>
      </header>
      <section className="features-section">
        <div className="feature">
          <h2>Accurate Predictions</h2>
          <p>Our model provides highly accurate predictions based on the latest data.</p>
        </div>
        <div className="feature">
          <h2>Easy to Use</h2>
          <p>Simply enter a few details and get the predicted rating instantly.</p>
        </div>
        <div className="feature">
          <h2>Free to Use</h2>
          <p>Enjoy our prediction service for free. No hidden charges.</p>
        </div>
      </section>
      <section className="form-section">
        <h2>Get Started with Your Prediction</h2>
        <PredictionForm />
      </section>
    </div>
  );
};

export default LandingPage;

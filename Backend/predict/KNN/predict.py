import joblib
import pandas as pd
from .knn_module import KNNRegressor  

def get_user_input_and_predict():
    month_mapping = {
        'JANUARY': 1, 'FEBRUARY': 2, 'MARCH': 3, 'APRIL': 4,
        'MAY': 5, 'JUNE': 6, 'JULY': 7, 'AUGUST': 8,
        'SEPTEMBER': 9, 'OCTOBER': 10, 'NOVEMBER': 11, 'DECEMBER': 12
    }

    weather_mapping = {
        'RAINY': 2, 'SUNNY': 1, 'CLOUDY': 3
    }

    # Example user input
    crop = "SPINACH"
    region = "CHATTOGRAM"
    month_str = "JULY"
    weather_str = "SUNNY"
    year = 2024

    month = month_mapping.get(month_str)
    weather = weather_mapping.get(weather_str)

    if month is None or weather is None:
        print("Invalid month or weather input.")
        return

    new_data_point = {
        'Crop': crop,
        'Region': region,
        'Month': month,
        'Weather': weather,
        'Year': year
    }

    # Load the trained model
    knn_regressor = joblib.load('knn_regressor.pkl')

    # Make prediction
    predicted_price = knn_regressor.predict(new_data_point)
    print(f"Predicted price: {predicted_price}")

# Run the prediction function
if __name__ == "__main__":
    get_user_input_and_predict()

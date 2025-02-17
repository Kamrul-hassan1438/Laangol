import joblib
import pandas as pd
from .knn_module import KNNRegressor  


def test_knn_regressor(new_data_point):
    model_path = 'E:\\10th Trimester\\SAD Lab\\Backend\\predict\\knn_regressor.pkl'
    knn_regressor = joblib.load(model_path)

    
    predicted_price = knn_regressor.predict(new_data_point)

    return predicted_price


if __name__ == '__main__':
    new_data_point = {
        'Crop': "TOMATO",
        'Region': "DHAKA",
        'Month': 12,
        'Weather': 2,
        'Year': 2024
    }
    print(test_knn_regressor(new_data_point))


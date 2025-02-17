import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder

class KNNRegressor:
    def __init__(self, k, weights=None):
        self.k = k
        self.train_set = None
        self.label_encoders = {}
        self.weights = weights if weights else {
            'Year': 6,
            'Month': 5,
            'Weather': 2,
            'Region': 1
        }

    def fit(self, data):
        for column in data.columns:
            if data[column].dtype == 'object':
                le = LabelEncoder()
                data[column] = le.fit_transform(data[column])
                self.label_encoders[column] = le
        
        data = data.sample(frac=1).reset_index(drop=True)
        train_size = int(1 * len(data))
        self.train_set = data.iloc[:train_size]

    def weighted_euclidean_distance(self, point1, point2):
        distance = 0
        for column, weight in self.weights.items():
            distance += weight * (point1[column] - point2[column]) ** 2
        return np.sqrt(distance)

    def predict(self, new_data_point):
        for column in new_data_point.keys():
            if column in self.label_encoders:
                if new_data_point[column] in self.label_encoders[column].classes_:
                    new_data_point[column] = self.label_encoders[column].transform([new_data_point[column]])[0]
                else:
                    return f"{column} value '{new_data_point[column]}' not available in training data."

        new_data_point = pd.Series(new_data_point)
        crop_data = self.train_set[self.train_set['Crop'] == new_data_point['Crop']]

        if crop_data.empty:
            return "Crop data not available."

        crop_data = crop_data.copy()
        crop_data['Distance'] = crop_data.apply(
            lambda row: self.weighted_euclidean_distance(row, new_data_point), axis=1
        )
        crop_data = crop_data.sort_values(by='Distance')

        neighbors = crop_data.iloc[:self.k]
        predicted_price = neighbors['Price'].mean()

        return predicted_price




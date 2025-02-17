import pandas as pd
from ml_models import KNNRegressor  
import joblib


data_file = 'knn_project\knn_app\crops_data.csv'
data = pd.read_csv(data_file)


knn_regressor = KNNRegressor(k=5)


knn_regressor.fit(data)

joblib.dump(knn_regressor, 'knn_regressor.pkl')
print("Model saved successfully!")

from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
import joblib
import pandas as pd

@method_decorator(csrf_exempt, name='dispatch') 
class CropPricePredictionView(View):

    def test_knn_regressor(self, new_data_point):
        model_path = 'E:\\10th Trimester\\SAD Lab\\Backend\\predict\\knn_regressor.pkl'
        knn_regressor = joblib.load(model_path)
        
        input_data = pd.DataFrame([new_data_point])  

        predicted_price = knn_regressor.predict(input_data)

        return predicted_price[0]  

    def post(self, request):
        data = json.loads(request.body)

        new_data_point = {
            'Crop': data.get('Crop'),
            'Region': data.get('Region'),
            'Month': data.get('Month'),
            'Weather': data.get('Weather'),
            'Year': data.get('Year')
        }

        predicted_price = self.test_knn_regressor(new_data_point)
        
        return JsonResponse({'predicted_price': predicted_price})


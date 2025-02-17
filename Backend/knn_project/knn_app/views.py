import csv
from django.http import JsonResponse
from django.views import View
from datetime import datetime


class ForecastPriceView(View):
    
    weights = {
        'Year': 0.6,
        'Month': 0.3,
        'Weather': 0.1
    }

    region_adjustments = {
        'BARISHAL': 1.0,
        'CHATTOGRAM': 1.1,
        'DHAKA': 1.2,
        'KHULNA': 1.15,
        'MYMENSINGH': 1.05,
        'RAJSHAHI': 1.1,
        'RANGPUR': 0.95,
        'SYLHET': 1.2
    }
    
    def get(self, request):
        crop = request.GET.get('crop').upper()
        region = request.GET.get('region').upper()
        month = int(request.GET.get('month'))
        weather = int(request.GET.get('weather'))


        csv_file = "knn_app/crops_data.csv"  
        data = self.load_csv_data(csv_file, crop, region)
        current_year = datetime.now().year
        
        forecast_price = self.forecast_price(data, current_year, month, weather, region)
        
        return JsonResponse({
            'Crop': crop,
            'Region': region,
            'Year': current_year,
            'Month': month,
            'Weather': weather,
            'ForecastedPrice': forecast_price
        }, safe=False)

    def load_csv_data(self, csv_file, crop, region):
        data = []
        with open(csv_file, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                if row['Crop'] == crop and row['Region'] == region:
                    data.append({
                        'Year': int(row['Year']),
                        'Month': int(row['Month']),
                        'Weather': int(row['Weather']),
                        'Price': float(row['Price'])
                    })
        return data

    def forecast_price(self, data, year, month, weather, region):
        if len(data) == 0:
            return "No data available for the selected crop/region."

        total_weighted_price = 0
        total_weight = 0
        for row in data:
            
            year_diff = abs(year - row['Year'])
            month_diff = abs(month - row['Month'])
            weather_diff = abs(weather - row['Weather'])

            
            year_weight = max(1 - year_diff / 10, 0)  # Closer years get higher weight
            month_weight = max(1 - month_diff / 12, 0)  # Closer months get higher weight
            weather_weight = max(1 - weather_diff / 5, 0)  # Closer weather gets higher weight

            # Total weight based on our predefined weight importance
            total_row_weight = (
                self.weights['Year'] * year_weight +
                self.weights['Month'] * month_weight +
                self.weights['Weather'] * weather_weight
            )

            # Weighted price contribution
            total_weighted_price += total_row_weight * row['Price']
            total_weight += total_row_weight

        # Ensure there's valid weight
        if total_weight == 0:
            return "Error in price calculation."

        # Calculate forecasted price
        forecasted_price = total_weighted_price / total_weight

        # Adjust forecasted price based on the region
        adjustment_factor = self.region_adjustments.get(region, 1.0)
        forecasted_price *= adjustment_factor

        # Round the forecasted price to a whole number
        forecasted_price = round(forecasted_price)

        return forecasted_price

import React, { useState, useEffect, useRef } from "react";
import Dropdown from "../Dropdown/DropDownTwo";
import Input_text from "../Input_Text/Input_text";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DropdownOption {
  value: string;
  label: string;
}

const categoryOptions: DropdownOption[] = [
  { value: "Dhaka", label: "Dhaka" },
  { value: "CHATTOGRAM", label: "CHATTOGRAM" },
  { value: "KHULNA", label: "KHULNA" },
  { value: "RAJSHAHI", label: "RAJSHAHI" },
  { value: "SYLHET", label: "SYLHET" },
  { value: "BARISHAL", label: "BARISHAL" },
  { value: "MYMENSINGH", label: "MYMENSINGH" },
  { value: "RANGPUR", label: "RANGPUR" },

];

const monthOptions: DropdownOption[] = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const weatherOptions: DropdownOption[] = [
  { value: "1", label: "Sunny" },
  { value: "2", label: "Cloudy" },
  { value: "3", label: "Rainy" },
];

const SmartPricePredict: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    category: string | null;
    month: string | null;
    weather: string | null;
  }>({ category: null, month: null, weather: null });

  const [cropValue, setCropValue] = useState<string>("");
  const [forecastedPrice, setForecastedPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleCategoryChange = (value: string) => {
    setSelectedOptions((prev) => ({ ...prev, category: value }));
  };

  const handleMonthChange = (value: string) => {
    setSelectedOptions((prev) => ({ ...prev, month: value }));
  };

  const handleWeatherChange = (value: string) => {
    setSelectedOptions((prev) => ({ ...prev, weather: value }));
  };

  const handleCropChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCropValue(e.target.value);
  };

  const handleCalculatePrice = async () => {
    const { category, month, weather } = selectedOptions;
    if (category && month && weather) {
      const crop = cropValue;
      setLoading(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:8007/forecast/?crop=${crop}&region=${category}&month=${month}&weather=${weather}`
        );

        if (response.ok) {
          const data = await response.json();
          setForecastedPrice(data.ForecastedPrice);
        } else {
          console.error("Error fetching forecasted price:", response.statusText);
          alert("Failed to fetch forecasted price.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please select all options before calculating the price.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-lime-100 bg-opacity-10">
      <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-xl">
        <div className="headings text-center py-2 px-5 rounded-md text-2xl text-lime-200 bg-lime-100">
          <p>Smart Price Prediction</p>
        </div>
        <div className="content mt-5 flex flex-col items-start space-y-5">
          <Input_text
            label="Crops"
            name="Crop"
            value={cropValue}
            onChange={handleCropChange}
            placeholder="Enter a Crop"
          />
          <Dropdown
            label="Select Region"
            options={categoryOptions}
            onChange={handleCategoryChange}
            placeholder="Select a region"
            className="min-w-fit text-base text-lime-200"
          />
          <Dropdown
            label="Select Month"
            options={monthOptions}
            onChange={handleMonthChange}
            placeholder="Select a month"
            className="min-w-fit text-base text-lime-200"
          />
          <Dropdown
            label="Select Weather Condition"
            options={weatherOptions}
            onChange={handleWeatherChange}
            placeholder="Select weather"
            className="min-w-fit text-base text-lime-200"
          />
      
          {forecastedPrice !== null && (
            <p className="text-lime-600 mt-4">Forecasted Price: {forecastedPrice}</p>
          )}
        </div>
        <button
          onClick={handleCalculatePrice}
          className="mt-4 object-center bg-lime-100 text-lime-200 p-2 rounded"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Calculating..." : "Calculate estimated price"}
        </button>
      </div>
    </div>
  );
};

export default SmartPricePredict;

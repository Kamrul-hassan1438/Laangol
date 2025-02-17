import { useState } from "react";
import Dropdown from "../../components/Dropdown/DropDownTwo"; // Imported Dropdown
import Input_text from "../../components/Input_Text/Input_text"; // Imported Input Text
import Button from "../../components/Button/Button"; // Assuming you may need it for submission
import crop from "../../assets/crop.png";

const monthOptions = [
	{ value: "January", label: "January" },
	{ value: "February", label: "February" },
	{ value: "March", label: "March" },
	{ value: "April", label: "April" },
	{ value: "May", label: "May" },
	{ value: "June", label: "June" },
	{ value: "July", label: "July" },
	{ value: "August", label: "August" },
	{ value: "September", label: "September" },
	{ value: "October", label: "October" },
	{ value: "November", label: "November" },
	{ value: "December", label: "December" },
];

const weatherOptions = [
	{ value: "Sunny", label: "Sunny" },
	{ value: "Rainy", label: "Rainy" },
	{ value: "Cloudy", label: "Cloudy" },
];

const Product_Management = () => {
	const [formData, setFormData] = useState({
		crop: "",
		soil: "",
		area: "",
		discountPercentage: "", // Field to track discount percentage
		discountStartDate: "", // Field for discount start date
		discountEndDate: "", // Field for discount end date
		product: "",
		month: "", // For month selection
		weather: "", // For weather selection
		productPrice: "", // For product price input
	});

	// Handle input changes for dropdowns and text input
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Handle dropdown selection
	const handleMonthChange = (selectedMonth: string) => {
		setFormData((prevData) => ({
			...prevData,
			month: selectedMonth,
		}));
	};

	const handleWeatherChange = (selectedWeather: string) => {
		setFormData((prevData) => ({
			...prevData,
			weather: selectedWeather,
		}));
	};

	return (
		<>
			<div className="product_management text-lime-200">
				<div className="top_part">
					<div className="heading text-4xl font-semibold mb-6">
						<h2>Product Management</h2>
					</div>
				</div>
				<div className="category_and_product_selection"></div>
				<div className="display_portion flex items-start justify-between space-x-5">
					{/* Adding Product Price Section */}
					<div className="adding_product_price w-full lg:w-1/3 flex flex-col items-start space-y-4">
						<h1 className="text-2xl mb-4">Adding Product Price</h1>

						{/* Select Month Dropdown */}
						<Dropdown
							label="Select Month"
							options={monthOptions}
							onChange={handleMonthChange}
							value={formData.month}
							placeholder="Choose a month"
							className="w-full"
						/>

						{/* Select Weather Condition Dropdown */}
						<Dropdown
							label="Select Weather Condition"
							options={weatherOptions}
							onChange={handleWeatherChange}
							value={formData.weather}
							placeholder="Choose a weather condition"
							className="w-full"
						/>

						{/* Input Text for product price */}
						<Input_text
							type="number"
							label="Estimated Price"
							name="productPrice"
							value={formData.productPrice} // Ensure it's a string
							onChange={handleInputChange}
							widthClass="w-full"
						/>

						<Button
							text="Add Product Price"
							onClick={() => console.log(formData)}
						/>
					</div>

					{/* Adding Product Discount Section */}
					<div className="adding_product_discount w-full lg:w-1/3 flex flex-col space-y-4">
						<h1 className="text-2xl mb-4">Adding Product Discount</h1>

						{/* Input for Discount Percentage */}
						<div className="input_box">
							<Input_text
								type="number"
								label="Discount Percentage"
								name="discountPercentage"
								value={formData.discountPercentage} // Ensure it's a string
								onChange={handleInputChange}
								widthClass="w-full"
							/>

							{/* Input for Discount Start Date */}
							<Input_text
								type="date"
								label="Discount Start Date"
								name="discountStartDate"
								value={formData.discountStartDate}
								onChange={handleInputChange}
								widthClass="w-full"
							/>

							{/* Input for Discount End Date */}
							<Input_text
								type="date"
								label="Discount End Date"
								name="discountEndDate"
								value={formData.discountEndDate}
								onChange={handleInputChange}
								widthClass="w-full"
							/>

							<Button
								text="Add Product Discount"
								onClick={() => console.log(formData)}
							/>
						</div>
					</div>

					{/* Product Display Section */}
					<div className="product_display_section w-full lg:w-1/3 flex flex-col items-center">
						<h1 className="text-2xl mb-4">Product Display</h1>

						<div className="product_display flex flex-col items-center">
							<div className="product_img mb-4">
								<img
									src={crop}
									alt="Product"
									className="w-40 h-40 object-cover"
								/>
							</div>

							<div className="product_description flex flex-col items-center">
								<p>Dendi</p>
								<p>Real Price: 500BDT</p>
								<p>Discounted Price: 420BDT</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Product_Management;

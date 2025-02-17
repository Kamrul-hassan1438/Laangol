import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Input_text from "../../components/Input_Text/Input_text";
import Dropdown from "../../components/Dropdown/DropDownTwo";
import { Link, useParams } from "react-router-dom";
import SmartPricePredict from "../../components/Popup/SmartPricePredict";

const Adding_items = () => {
	const { productId } = useParams<{ productId: string }>(); // Retrieve the productId from URL
	const [formData, setFormData] = useState({
		productName: "",
		productDescription: "",
		productQuantity: "",
		productPrice: "",
		image: null as File | null,
	});

	const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false); // State for controlling the popup

	// Fetch existing product details if productId is provided
	useEffect(() => {
		if (productId) {
			const fetchProductDetails = async () => {
				const token = localStorage.getItem("token");
				try {
					const response = await fetch(
						`http://localhost:8001/api/products/${productId}/`,
						{
							method: "GET",
							headers: {
								Authorization: `Token ${token}`,
							},
						}
					);

					if (!response.ok) {
						throw new Error("Failed to fetch product details");
					}

					const data = await response.json();
					setFormData({
						productName: data.name || "",
						productDescription: data.description || "",
						productQuantity: data.max_quantity?.toString() || "", // Ensure it's a string
						productPrice: data.price?.toString() || "", // Ensure it's a string
						image: null, // Handle image separately if needed
					});
					// Set selected category based on fetched data
					const categoryIndex = categoryOptions.findIndex(
						(option) => option.label === data.category
					);
					setSelectedCategory(categoryIndex !== -1 ? categoryIndex + 1 : null); // +1 to match the index with categoryOptions
				} catch (error) {
					console.error(error);
				}
			};

			fetchProductDetails();
		}
	}, [productId]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setFormData((prev) => ({
			...prev,
			image: file,
		}));
	};

	const handleCategoryChange = (selectedValue: number) => {
		setSelectedCategory(selectedValue);
	};

	const categoryOptions = [
		{ value: 1, label: "Vegetables" },
		{ value: 2, label: "Fertilizers" },
		{ value: 3, label: "Accessories" },
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const formDataToSend = new FormData();
		formDataToSend.append("name", formData.productName);
		formDataToSend.append("price", formData.productPrice);
		formDataToSend.append("description", formData.productDescription);
		formDataToSend.append("max_quantity", formData.productQuantity);
		formDataToSend.append("active", "1");

		if (selectedCategory !== null) {
			const selectedCategoryLabel = categoryOptions.find(
				(option) => option.value === selectedCategory
			)?.label;
			if (selectedCategoryLabel) {
				formDataToSend.append("category", selectedCategoryLabel);
			}
		}

		if (formData.image) {
			formDataToSend.append("image", formData.image);
		}

		const token = localStorage.getItem("token");
		try {
			const method = productId ? "PUT" : "POST"; // Use PUT if updating existing product
			const url = productId
				? `http://localhost:8001/api/products/${productId}/`
				: "http://localhost:8001/api/products/";
			const response = await fetch(url, {
				method,
				headers: {
					Authorization: `Token ${token}`,
				},
				body: formDataToSend,
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const result = await response.json();
			console.log(result);
		} catch (error) {
			console.error("Error adding/updating product:", error);
		}
	};

	const togglePopup = () => {
		setIsPopupOpen(!isPopupOpen);
	};

	return (
		<>
			<div className="heading flex items-center justify-between text-2xl sm:text-3xl md:text-4xl font-semibold text-lime-900 text-start">
				<h1>Marketplace</h1>
				<Link
					to="/dashboard/marketplace/add_items/inventory"
					className="text-base"
				>
					<Button text="Seller Profile" px="px-4" />
				</Link>
			</div>
			<div className="form_part flex flex-col items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 mt-4">
				<div className="subheading flex items-center justify-center w-full">
					<h2 className="p-2 rounded-md w-max bg-lime-100 text-lime-200 text-2xl md:text-3xl font-normal">
						Product Management
					</h2>
				</div>

				<form
					className="flex flex-col items-center w-full md:items-start space-y-4 md:space-y-2"
					onSubmit={handleSubmit}
				>
					<div className="Select_category">
						<Dropdown
							label="Click to select Category"
							options={categoryOptions}
							onChange={handleCategoryChange}
							value={selectedCategory} // Pass selectedCategory as value
							placeholder="Select a category"
							className="min-w-fit text-lime-200"
						/>
					</div>

					<Input_text
						label="Product Name"
						name="productName"
						value={formData.productName}
						onChange={handleInputChange}
					/>
					<Input_text
						label="Product Description"
						name="productDescription"
						value={formData.productDescription}
						onChange={handleInputChange}
					/>
					<Input_text
						type="number"
						label="Product Quantity"
						name="productQuantity"
						value={formData.productQuantity}
						onChange={handleInputChange}
					/>
					<Input_text
						type="number"
						label="Product Price"
						name="productPrice"
						value={formData.productPrice}
						onChange={handleInputChange}
					/>

					<label className="text-lime-200">Upload your image</label>
					<input
						type="file"
						id="file-input"
						name="image"
						accept="image/*"
						onChange={handleFileChange}
						className="hidden"
					/>
					<label
						htmlFor="file-input"
						className="cursor-pointer px-4 py-2 bg-lime-100 text-lime-200 rounded-md transition duration-200 ease-in-out transform hover:bg-lime-200 hover:text-white"
					>
						Choose Picture
					</label>
				</form>
			</div>
			<div className="suggested_price flex items-center space-x-3 mt-6 w-full">
				<h2 className="text-lime-900 text-lg md:text-2xl">
					Preferred/ Best price:
				</h2>
				<Button text="Apply Smart price Prediction" onClick={togglePopup} />
			</div>
			<p className="mt-4 px-2  w-full sm:w-max bg-lime-100 bg-opacity-10 border border-lime-400 rounded-md text-lime-900 text-sm md:text-base">
				The best price is based on market value as well as the determined
				government price.
			</p>
			<div className="mt-4 submission flex flex-col items-center space-y-5 w-full">
				<Button text="Add your Product" onClick={handleSubmit} />
				<Link to="/dashboard/marketplace/marketplace2">
					<Button text="Visit Marketplace" />
				</Link>
			</div>
			{/* The Popup */}
			{isPopupOpen && (
				<SmartPricePredict isOpen={isPopupOpen} onClose={togglePopup} />
			)}
		</>
	);
};

export default Adding_items;

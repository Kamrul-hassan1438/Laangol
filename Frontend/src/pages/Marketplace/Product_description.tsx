import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Selector from "../../components/Button/Selector";
import Product_card from "../../components/Dynamic_card/Product_card";
import axios from "axios";
import AddItems from "../../components/Popup/AddItems"; // Import the AddItems component

// Define the Product interface
interface Product {
	product_id: number;
	image: string;
	name: string;
	seller: string;
	seller_id: number; // Add seller_id for chat functionality
	price: number;
	sellerImage: string;
}

const Product_description = () => {
	const location = useLocation();
	const product = location.state?.product;
	const token = localStorage.getItem("token");

	if (!product) {
		return <p>No product data available</p>;
	}

	const [moreProducts, setMoreProducts] = useState<Product[]>([]);
	const [quantity, setQuantity] = useState<number>(1);
	const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

	useEffect(() => {
		const fetchMoreProducts = async () => {
			try {
				const response = await axios.get(
					`http://127.0.0.1:8001/Moreproducts/${product.product_id}/`,
					{
						headers: {
							Authorization: `Token ${token}`,
							"Content-Type": "application/json",
						},
					}
				);
				setMoreProducts(response.data);
			} catch (error) {
				console.error("Error fetching more products:", error);
			}
		};

		fetchMoreProducts();
	}, [product.product_id, token]);

	const handleAddToCart = async () => {
		try {
			const response = await axios.post(
				"http://127.0.0.1:8001/Add-cart/",
				{
					product_id: product.product_id,
					quantity: quantity,
				},
				{
					headers: {
						Authorization: `Token ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			console.log("Product added to cart:", response.data);
			setIsPopupOpen(true); // Open the popup after adding to cart
		} catch (error) {
			console.error("Error adding product to cart:", error);
		}
	};

	// Function to handle "Chat with Seller" click
	const handleChatWithSeller = async () => {
		try {
			const response = await axios.post(
				"http://127.0.0.1:8008/chat/conversation/",
				{
					user_2_id: product.seller_id, // Seller ID from product data
				},
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			);
			console.log("Chat conversation started:", response.data);
			// You can navigate to the chat page or show chat UI here
		} catch (error) {
			console.error("Error starting chat with seller:", error);
		}
	};

	return (
		<>
			{/* Header Section */}
			<div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-lime-900 text-left">
				<h1>Marketplace</h1>
			</div>

			{/* Product Section */}
			<div className="mt-8 md:mt-10 lg:mt-12">
				<h2 className="p-2 rounded-md w-max bg-lime-100 text-lime-900 text-xl md:text-2xl lg:text-3xl font-normal">
					Product Page
				</h2>

				<div className="mt-5 md:mt-7 flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-6">
					{/* Product Image */}
					<div className="flex-shrink-0 w-full sm:w-auto">
						<img
							src={product.image}
							alt={`Image of ${product.name}`}
							className="w-60 h-w-60 min-w-60 min-h-60 h-60 object-cover rounded-full border-lime-200 bg-lime-200 p-1"
						/>
					</div>

					{/* Product Details */}
					<div className="flex flex-col space-y-4 w-full lg:w-1/2">
						<h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-lime-900">
							{product.name}
						</h3>

						<p className="w-max p-2 md:p-3 rounded-md bg-lime-100 text-lime-900">
							{product.price}/KG BDT
						</p>

						<div className="flex flex-wrap items-start space-x-2">
							<p className="p-1 bg-lime-100 bg-opacity-10 border border-lime-100 rounded-md text-lime-900">
								{product.category}
							</p>
						</div>

						<p className="text-base md:text-lg text-lime-700">
							{product.description}
						</p>

						{/* Seller info */}
						<div className="seller_info flex items-center space-x-2">
							<img
								src={product.sellerImage}
								alt="Seller"
								className="w-8 md:w-10 rounded-lg"
							/>
							<p className="text-base md:text-lg text-lime-200">
								{product.seller}
							</p>
						</div>

						{/* Quantity Selector */}
						<div className="flex items-center space-x-2">
							<Selector
								initialQuantity={quantity}
								min={1}
								max={100} 
								onQuantityChange={setQuantity}
							/>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
							<Button text="Add to cart" onClick={handleAddToCart} />
							<Button text="Chat with Seller" onClick={handleChatWithSeller} />
						</div>
					</div>
				</div>

				{/* More Products Section */}
				<div className="More_from_Seller my-3 text-center">
					<h1 className="text-lime-200 px-3 py-2 text-2xl font-semibold">
						More From similar Seller
					</h1>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 mt-6 p-4 rounded-lg">
					{moreProducts.length > 0 ? (
						moreProducts.map((item) => (
							<Product_card
								key={item.product_id}
								product_id={item.product_id}
								imageSrc={item.image}
								productName={item.name}
								sellerName={item.seller}
								price={item.price}
							/>
						))
					) : (
						<p>No additional products available.</p>
					)}
				</div>
			</div>

			{/* AddItems Popup */}
			<AddItems isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
		</>
	);
};

export default Product_description;

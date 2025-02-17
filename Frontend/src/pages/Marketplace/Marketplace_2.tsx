import { useEffect, useState } from "react";
import Marketplace_top from "../../components/Marketplace_top/Marketplace_top";
import ProductCard from "../../components/Dynamic_card/Product_card";
import fertilizers from "../../assets/fertilizers.png"; // Optional fallback image
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Define the Product type
type Product = {
	product_id: number;
	image: string;
	name: string;
	seller: string;
	price: number;
	category?: string; // Optional, in case category is needed
	description?: string; // Optional, in case description is needed
	sellerImage?: string; // Optional, in case seller image is needed
};

const Marketplace_2 = () => {
	const { category } = useParams();
	const navigate = useNavigate();
	const [products, setProducts] = useState<Product[]>([]); // Use the defined Product type
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			const token = localStorage.getItem("token"); // Get token from local storage

			try {
				const response = await axios.get(
					`http://127.0.0.1:8001/api/recent-products/`,
					{
						params: { category: category }, // Category passed as a query parameter
						headers: {
							Authorization: `Token ${token}`, // Authorization header
							"Content-Type": "application/json", // Content-Type header
						},
					}
				);
				setProducts(response.data); // Store fetched products in state
			} catch (err) {
				setError("Error fetching products");
				console.log(error); // Set error state if request fails
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [category]);

	// Function to handle product click and navigate to product description
	const handleProductClick = (product: Product) => {
		navigate(
			`/dashboard/marketplace/marketplace2/product_details/${product.product_id}`,
			{
				state: { product },
			}
		);
	};

	return (
		<>
			<Marketplace_top />
			<div className="marketplace_items flex flex-col items-center justify-center">
				<div className="items_banner mt-5 w-max p-2 bg-lime-100 text-2xl text-lime-200 rounded-md">
					<h1>{category}</h1>
				</div>

				<div className="mt-8 items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-40 items-center justify-between">
					{loading ? (
						<p>Loading products...</p>
					) : error ? (
						<p>{error}</p>
					) : products.length === 0 ? (
						<p>No products found for {category}</p>
					) : (
						products.map((product) => (
							<div
								key={product.product_id}
								onClick={() => handleProductClick(product)}
							>
								<ProductCard
									product_id={product.product_id}
									imageSrc={product.image ? product.image : fertilizers}
									productName={product.name}
									sellerName={product.seller}
									price={product.price}
								/>
							</div>
						))
					)}
				</div>
			</div>
		</>
	);
};

export default Marketplace_2;

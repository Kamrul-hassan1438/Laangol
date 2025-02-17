import { useEffect, useState } from "react";
import EditProduct from "../../components/Product_edit/EditProduct"; // Ensure the path is correct

interface InventoryItem {
	product_id: number;
	category: string;
	price: string;
	name: string;
	description: string;
	max_quantity: number;
	seller: number;
	active: number;
	image: string;
}

const Inventory = () => {
	const [inventory, setInventory] = useState<InventoryItem[]>([]);
	const token = localStorage.getItem("token");

	useEffect(() => {
		const fetchInventory = async () => {
			try {
				const response = await fetch("http://127.0.0.1:8001/inventory/", {
					method: "GET",
					headers: {
						Authorization: `Token ${token}`,
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch inventory");
				}

				const data = await response.json();
				setInventory(data.inventory);
			} catch (error) {
				console.error(error);
			}
		};

		fetchInventory();
	}, [token]);

	return (
		<div className="inventory">
			<div className="heading flex items-center justify-between text-2xl sm:text-3xl md:text-4xl font-semibold text-lime-900 text-start">
				<h1>Seller Inventory</h1>
			</div>

			<div className="mt-10 display_content grid grid-cols-6 gap-4">
				{inventory.map((product) => {
					const fullImageUrl = product.image.startsWith("http")
						? product.image
						: `http://127.0.0.1:8001${product.image}`;

					return (
						<EditProduct
							key={product.product_id}
							productName={product.name}
							productPrice={`BDT ${product.price}`}
							imageUrl={fullImageUrl}
							productId={product.product_id} // Pass productId
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Inventory;

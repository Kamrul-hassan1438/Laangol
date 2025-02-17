import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Input_text from "../../components/Input_Text/Input_text";
import del from "../../assets/delete.png";
import CompletePurchase from "../../components/Popup/CompletePurchase";
import WarningPopup from "../../components/Popup/Warning";
import PrivacyPolicy from "../../components/Popup/PrivacyPolicy";
import TermsAndCondition from "../../components/Popup/TermsAndCondition";

interface CartItem {
	product_id: number;
	product_name: string;
	quantity: number;
	unit_price: number;
	total_price: number;
}

interface CartData {
	cart_id: number;
	items: CartItem[];
	total_amount: number;
}

const Cart = () => {
	const [formData, setFormData] = useState({
		address: "",
	});

	const [cartData, setCartData] = useState<CartData | null>(null);
	const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
	const token = localStorage.getItem("token");
	const [isCompletePopupOpen, setCompletePopupOpen] = useState(false);
	const [isWarningPopupOpen, setWarningPopupOpen] = useState(false);
	const [isPrivacyPopupOpen, setPrivacyPopupOpen] = useState(false);
	const [isTermsPopupOpen, setTermsPopupOpen] = useState(false);

	useEffect(() => {
		const fetchCartData = async () => {
			try {
				const response = await fetch("http://127.0.0.1:8001/cart/", {
					headers: {
						Authorization: `Token ${token}`,
					},
				});

				const data: CartData = await response.json();
				setCartData(data);
			} catch (error) {
				console.error("Error fetching cart data:", error);
			}
		};

		fetchCartData();
	}, [token]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleCheckout = async () => {
		if (!cartData) return;

		const termsChecked = document.getElementById(
			"terms-conditions"
		) as HTMLInputElement;
		const privacyChecked = document.getElementById(
			"privacy-policy"
		) as HTMLInputElement;

		if (!formData.address || !termsChecked.checked || !privacyChecked.checked) {
			setWarningPopupOpen(true);
			return;
		}

		const checkoutData = {
			cart_id: cartData.cart_id,
			payment_method: paymentMethod,
			shipping_address: formData.address,
		};

		try {
			const response = await fetch("http://127.0.0.1:8001/cart/CheckoutView/", {
				method: "POST",
				headers: {
					Authorization: `Token ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(checkoutData),
			});

			if (response.ok) {
				const result = await response.json();
				console.log("Checkout successful:", result);
				setCompletePopupOpen(true);
			} else {
				console.error("Checkout failed");
			}
		} catch (error) {
			console.error("Error during checkout:", error);
		}
	};

	const handleDeleteItem = async (product_id: number) => {
		if (!cartData) return;

		const deleteData = {
			cart_id: cartData.cart_id,
			product_id,
		};

		try {
			const response = await fetch("http://127.0.0.1:8001/RemoveCartItem/", {
				method: "DELETE",
				headers: {
					Authorization: `Token ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(deleteData),
			});

			if (response.ok) {
				// Remove the deleted item from the cart data
				const updatedItems = cartData.items.filter(
					(item) => item.product_id !== product_id
				);
				setCartData({
					...cartData,
					items: updatedItems,
					total_amount: updatedItems.reduce(
						(acc, item) => acc + item.total_price,
						0
					),
				});
				console.log("Item deleted successfully");
			} else {
				console.error("Failed to delete item");
			}
		} catch (error) {
			console.error("Error during item deletion:", error);
		}
	};

	return (
		<div className="Cart">
			<div className="headings w-max text-lime-900">
				<h1 className="text-4xl">Cart</h1>
			</div>

			{cartData ? (
				<div className="cart mt-5">
					{/* Additional Info */}
					<div className="additional_info mt-6 flex items-baseline space-x-5">
						<div className="shipping_address flex flex-col space-y-4">
							<div className="heading w-max px-3 py-1 rounded-md bg-lime-100 text-lime-200">
								<h2>Shipping Address</h2>
							</div>
							<Input_text
								type="text"
								name="address"
								value={formData.address}
								onChange={handleInputChange}
								widthClass="w-full"
							/>
						</div>

						{/* Payment Method */}
						<div className="payment_method flex flex-col space-y-4">
							<div className="heading w-max px-3 py-1 rounded-md bg-lime-100 text-lime-200">
								<h2>Payment Method</h2>
							</div>
							<div className="methods flex space-x-5 bg-lime-100 bg-opacity-10 p-3 rounded-md border border-lime-400 text-lime-900">
								<div className="flex items-center">
									<input
										id="cash-on-delivery"
										type="radio"
										value="Cash on Delivery"
										name="paymentMethod"
										className="w-4 h-4 accent-lime-800 bg-gray-100 border-white"
										defaultChecked
										onChange={(e) => setPaymentMethod(e.target.value)}
									/>
									<label
										htmlFor="cash-on-delivery"
										className="ms-2 font-medium text-lime-900"
									>
										Cash on Delivery
									</label>
								</div>
								<div className="flex items-center">
									<input
										id="bkash"
										type="radio"
										value="Bkash"
										name="paymentMethod"
										className="w-4 h-4 accent-lime-800 bg-gray-100 border-white"
										onChange={(e) => setPaymentMethod(e.target.value)}
									/>
									<label
										htmlFor="bkash"
										className="ms-2 font-medium text-lime-900"
									>
										Bkash
									</label>
								</div>
							</div>
						</div>
					</div>

					<div className="heading w-max px-3 py-2 rounded-md text-lime-200 bg-lime-100">
						<h2 className="text-2xl">Shopping Cart</h2>
					</div>
					<div className="mt-4 items flex flex-col justify-between">
						<table className="text-center">
							<thead>
								<tr className="p-3 w-max rounded-md bg-lime-100 bg-opacity-10 border border-lime-100 text-lime-900">
									<th>Product</th>
									<th>Quantity</th>
									<th>Unit Price</th>
									<th>Price</th>
								</tr>
							</thead>
							<tbody>
								{cartData.items.map((item) => (
									<tr key={item.product_id}>
										<td>{item.product_name}</td>
										<td>{item.quantity}</td>
										<td>{item.unit_price} BDT</td>
										<td>{item.total_price} BDT</td>
										<td>
											<button onClick={() => handleDeleteItem(item.product_id)}>
												<img src={del} alt="" className="w-4 h-4" />
											</button>
										</td>
									</tr>
								))}
								<tr className="bg-lime-100 bg-opacity-10 border border-lime-100 leading-10">
									<td>Sub Total</td>
									<td></td>
									<td></td>
									<td>{cartData.total_amount} BDT</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			) : (
				<p>Loading cart data...</p>
			)}

			{/* Checkout Section */}
			<div className="toCheckout mt-16 flex items-center justify-between">
				<div className="checkbox flex flex-col">
					<div className="flex items-center">
						<input
							id="terms-conditions"
							type="checkbox"
							value=""
							className="w-4 h-4 accent-lime-800 dark:bg-white"
						/>
						<label
							htmlFor="terms-conditions"
							className="ms-2 text-lime-900"
							onClick={() => setTermsPopupOpen(true)}
						>
							I agree to the{" "}
							<a href="#" className="text-lime-600">
								Terms and Conditions
							</a>
						</label>
					</div>
					<div className="flex items-center">
						<input
							id="privacy-policy"
							type="checkbox"
							value=""
							className="w-4 h-4 accent-lime-800  dark:bg-white"
						/>
						<label
							htmlFor="privacy-policy"
							className="ms-2 text-lime-900"
							onClick={() => setPrivacyPopupOpen(true)}
						>
							I have read and agree to the{" "}
							<a href="#" className="text-lime-600">
								Privacy Policy
							</a>
						</label>
					</div>
				</div>
				<div className="button">
					<Button text="Checkout" onClick={handleCheckout} />
				</div>
			</div>

			{/* Popups */}
			{isCompletePopupOpen && (
				<CompletePurchase
					isOpen={isCompletePopupOpen}
					onClose={() => setCompletePopupOpen(false)}
				/>
			)}
			{isWarningPopupOpen && (
				<WarningPopup
					isOpen={isWarningPopupOpen}
					onClose={() => setWarningPopupOpen(false)}
				/>
			)}
			{isPrivacyPopupOpen && (
				<PrivacyPolicy
					isOpen={isPrivacyPopupOpen}
					onClose={() => setPrivacyPopupOpen(false)}
				/>
			)}
			{isTermsPopupOpen && (
				<TermsAndCondition
					isOpen={isTermsPopupOpen}
					onClose={() => setTermsPopupOpen(false)}
				/>
			)}
		</div>
	);
};

export default Cart;

import React, { useState } from "react";

interface QuantitySelectorProps {
	initialQuantity?: number;
	min?: number;
	max?: number;
	onQuantityChange: (quantity: number) => void; // Add this prop
}

const Selector: React.FC<QuantitySelectorProps> = ({
	initialQuantity = 0,
	min = 0,
	max = 100,
	onQuantityChange, // Accept this prop
}) => {
	const [quantity, setQuantity] = useState<number>(initialQuantity);

	const increase = () => {
		if (quantity < max) {
			const newQuantity = quantity + 1;
			setQuantity(newQuantity);
			onQuantityChange(newQuantity); // Notify parent component
		}
	};

	const decrease = () => {
		if (quantity > min) {
			const newQuantity = quantity - 1;
			setQuantity(newQuantity);
			onQuantityChange(newQuantity); // Notify parent component
		}
	};

	return (
		<div className="flex items-center space-x-4">
			<button
				className="px-4 py-2 bg-lime-100 transition duration-200 ease-in-out transform hover:bg-lime-200 text-white rounded"
				onClick={decrease}
				disabled={quantity <= min}
			>
				-
			</button>

			<div className="text-2xl text-lime-200">{quantity}</div>

			<button
				className="px-4 py-2 bg-lime-100 transition duration-200 ease-in-out transform hover:bg-lime-200 text-white rounded"
				onClick={increase}
				disabled={quantity >= max}
			>
				+
			</button>
		</div>
	);
};

export default Selector;

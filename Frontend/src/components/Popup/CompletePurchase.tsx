import React, { useState } from "react";
import Button from "../Button/Button";
import card from "../../assets/shopping.png";

interface PopupProps {
	isOpen: boolean;
	onClose: () => void;
}

const CompletePurchase: React.FC<PopupProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-lime-100 bg-opacity-10">
			<div className="bg-white p-6 rounded-lg shadow-xl">
				<div className="content flex flex-col items-center space-y-5">
					<img src={card} alt="" className="w-12 h-12" />
					<div className="text flex flex-col items-center space-y-2">
						<h2 className="text-3xl font-semibold text-center text-lime-200">
							Thank you for Your Purchase
						</h2>
						<p className="w-max py-2 px-3 bg-lime-100 text-lg text-lime-200 rounded-md text-center">
							Order ID: 123456
						</p>
					</div>
					<Button text="Continue to Shopping" onClick={onClose} />
				</div>
			</div>
		</div>
	);
};
export default CompletePurchase;

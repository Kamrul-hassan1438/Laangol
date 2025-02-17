import React, { useState } from "react";
import InfoPopup from "../InfoPopUp/InfoPopup"; // Assuming your InfoPopup component is in the same folder

const ButtonWithPopUp: React.FC = () => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const openPopup = () => {
		setIsPopupOpen(true);
	};

	const closePopup = () => {
		setIsPopupOpen(false);
	};

	const handleConfirm = () => {
		console.log("Confirmed");
		closePopup(); // Close the popup when confirm is clicked
	};

	return (
		<div className="flex flex-col items-center">
			<button
				className="py-2 px-4 text-white bg-lime-800 hover:bg-lime-900 rounded-lg"
				onClick={openPopup}
			>
				Open Popup
			</button>

			{/* Popup Component */}
			<InfoPopup
				isOpen={isPopupOpen}
				onClose={closePopup}
				onConfirm={handleConfirm}
				imageSrc="https://via.placeholder.com/150" // Replace with your image URL
				message="Are you sure you want to proceed?"
				orderId="12345"
			/>
		</div>
	);
};

export default ButtonWithPopUp;

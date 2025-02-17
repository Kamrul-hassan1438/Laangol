import React, { useState } from "react";
import Button from "../Button/Button";

interface PopupProps {
	isOpen: boolean;
	onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
			<div className="bg-white p-6 rounded-lg shadow-lg">
				<h2 className="text-xl font-bold mb-4">Popup Title</h2>
				<p className="mb-4">This is the content of the popup.</p>
				<Button text="Close" onClick={onClose} />
			</div>
		</div>
	);
};

const Pop: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<button
				onClick={togglePopup}
				className={`bg-lime-100 text-lime-200 font-normal text-lg rounded-lg transition duration-200 ease-in-out transform hover:bg-lime-200 hover:text-lime-50 px-4 py-2`}
			>
				{isOpen ? "Hide Popup" : "Show Popup"}
			</button>
			<Popup isOpen={isOpen} onClose={togglePopup} />
		</div>
	);
};

export default Pop;

import React from "react";
import Button from "../Button/Button";

interface PopupProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string; // Optional title prop
	message?: string; // Optional message prop
	buttonText?: string; // Optional button text prop
}

const Warning: React.FC<PopupProps> = ({
	isOpen,
	onClose,
	title = "Warning", // Default title
	message = "An error occurred", // Default message
	buttonText = "Try Again", // Default button text
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-lime-100 bg-opacity-10">
			<div className="bg-white p-6 rounded-lg shadow-xl">
				<div className="content flex flex-col items-center space-y-5">
					<div className="text flex flex-col items-center space-y-2">
						<h2 className="text-3xl font-semibold text-center text-lime-200">
							{title}
						</h2>
						<p className="text-center text-lime-100">{message}</p>{" "}
						{/* Added message */}
					</div>
					<Button text={buttonText} onClick={onClose} />
				</div>
			</div>
		</div>
	);
};

export default Warning;

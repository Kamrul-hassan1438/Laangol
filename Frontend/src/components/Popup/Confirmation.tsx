import React from "react";
import Button from "../Button/Button";

interface PopupProps {
	isOpen: boolean;
	onClose: () => void;
}

const Confirmation: React.FC<PopupProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-lime-100 bg-opacity-10">
			<div className="bg-white p-6 rounded-lg shadow-xl">
				<div className="content flex flex-col items-center space-y-5">
					<div className="text flex flex-col items-center space-y-2">
						<h2 className="text-3xl font-semibold text-center text-lime-200">
							Request sent to successfully
						</h2>
					</div>
					<Button text="OK" onClick={onClose} />
				</div>
			</div>
		</div>
	);
};

export default Confirmation;

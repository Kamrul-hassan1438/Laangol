import React from "react";
import Button from "../Button/Button";

interface PopupProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void; // Add onConfirm prop
}

const Are_You_Sure: React.FC<PopupProps> = ({ isOpen, onClose, onConfirm }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-lime-100 bg-opacity-10">
			<div className="bg-white p-6 rounded-lg shadow-xl">
				<div className="content flex flex-col items-center space-y-5">
					<div className="text flex flex-col items-center space-y-2">
						<h2 className="text-3xl font-semibold text-center text-lime-200">
							Do you want to take this job?
						</h2>
					</div>
					<div className="button_section">
						<Button text="Yes" onClick={onConfirm} /> {/* Call onConfirm */}
						<Button text="No" onClick={onClose} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Are_You_Sure;

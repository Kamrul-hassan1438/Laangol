import React from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

interface ConfirmationProps {
	isOpen: boolean;
	onClose: () => void;
	hirerName: string | undefined; // New prop for hirer name
}

const Confirmed: React.FC<ConfirmationProps> = ({
	isOpen,
	onClose,
	hirerName,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-lime-100 bg-opacity-10">
			<div className="bg-white p-6 rounded-lg shadow-xl">
				<div className="content flex flex-col items-center space-y-5">
					<div className="text flex flex-col items-center space-y-2">
						<h2 className="text-3xl font-semibold text-center text-lime-200">
							Job has been taken successfully
						</h2>
					</div>
					<div className="button_section flex items-center space-x-5">
						<Button text="OK" onClick={onClose} />
						<Link to="/dashboard/chat">
							<Button text={`Contact ${hirerName}`} onClick={onClose} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Confirmed;

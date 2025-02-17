import React, { forwardRef, useState } from "react";
import Button from "../Button/Button";
import Input_text from "../Input_Text/Input_text";

interface PopupProps {
	isOpen: boolean;
	onClose: () => void;
	onCloseToggle: () => void; // New prop to handle toggle deactivation
}

const Available_labor = forwardRef<HTMLDivElement, PopupProps>(
	({ isOpen, onClose, onCloseToggle }, ref) => {
		const [userInfo, setUserInfo] = useState({
			startingTime: "",
			finishingTime: "",
		});

		// Handle input change
		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			setUserInfo((prevInfo) => ({
				...prevInfo,
				[name]: value,
			}));
		};

		if (!isOpen) return null;

		return (
			<div
				ref={ref}
				className="fixed inset-0 flex items-center justify-center bg-lime-100 bg-opacity-10"
			>
				<div className="bg-white p-6 rounded-lg shadow-xl">
					<div className="content flex flex-col items-center space-y-5">
						<div className="input_form">
							<Input_text
								type="date"
								label="Starting Date"
								name="startingTime"
								value={userInfo.startingTime}
								onChange={handleInputChange}
								widthClass="w-full"
							/>
							<Input_text
								type="date"
								label="Finishing Date"
								name="finishingTime"
								value={userInfo.finishingTime}
								onChange={handleInputChange}
								widthClass="w-full"
							/>
						</div>
						<div className="action_btn flex flex-col items-center space-y-5">
							<Button text="Set Available" py-1 onClick={onClose} />
							<Button
								onClick={() => {
									onCloseToggle(); // Call the toggle deactivation function
									onClose(); // Close the popup
								}}
								text="Close"
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
);

export default Available_labor;

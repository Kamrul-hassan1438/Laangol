import React, { useState } from "react";
import Button from "../Button/Button";
import Input_text from "../Input_Text/Input_text";
import Confirmation from "./Confirmation"; // Import the confirmation component

interface Laborer {
	laborer_name: string;
	region_name: string;
	experience: number;
	specialties: string;
	demand_fees: number;
	status: string;
	labour_id: number;
	current_hire_end_date: string | null;
	image_url: string | null;
}

interface PopupProps {
	isOpen: boolean;
	onClose: () => void;
	laborer: Laborer | null;
}

const HiringLabor: React.FC<PopupProps> = ({ isOpen, onClose, laborer }) => {
	const [userInfo, setUserInfo] = useState({
		finishingDate: "",
		startingDate: "",
		sqft: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null); // Error state
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // State to control confirmation popup

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserInfo((prevInfo) => ({
			...prevInfo,
			[name]: value,
		}));
	};

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	// Function to handle the hire request
	const handleHireRequest = async () => {
		const payload = {
			labour_id: laborer?.labour_id,
			start_date: userInfo.startingDate,
			end_date: userInfo.finishingDate,
		};

		setIsLoading(true); // Set loading state to true
		setError(null); // Reset error state

		try {
			const token = localStorage.getItem("token");
			const response = await fetch("http://127.0.0.1:8002/api/labour/hire/", {
				method: "POST",
				headers: {
					Authorization: `Token ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const errorData = await response.json();
				setError(
					errorData.message || "Failed to hire laborer. Please try again."
				);
				return;
			}

			// If hire request is successful
			const data = await response.json();
			console.log("Hire request successful", data);

			// Open confirmation popup
			setIsConfirmationOpen(true);
		} catch (error) {
			console.error("Error during hire request", error);
			setError("An error occurred. Please try again later.");
		} finally {
			setIsLoading(false); // Set loading state to false
		}
	};

	// If the popup is not open, return null
	if (!isOpen || !laborer) return null;

	return (
		<>
			<div
				className="fixed inset-0 flex items-center justify-center bg-lime-100 bg-opacity-10"
				onClick={handleOverlayClick}
			>
				<div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
					{/* Laborer Info */}
					<div className="mb-4 text-center">
						<h2 className="text-2xl font-semibold">
							Request to Hire {laborer.laborer_name}
						</h2>
						<p>{laborer.specialties}</p>
						<p>{laborer.region_name}</p>
					</div>

					{/* Error Message */}
					{error && <p className="text-red-500 text-center">{error}</p>}

					<div className="content flex flex-col items-center space-y-5">
						{/* Input Form */}
						<div className="input_form w-full space-y-4">
							<Input_text
								type="date"
								label="Starting Date"
								name="startingDate"
								value={userInfo.startingDate}
								onChange={handleInputChange}
								widthClass="w-full"
							/>
							<Input_text
								type="date"
								label="Finishing Date"
								name="finishingDate"
								value={userInfo.finishingDate}
								onChange={handleInputChange}
								widthClass="w-full"
							/>
						</div>
						<Button
							text={isLoading ? "Requesting..." : "Request for Hire"}
							onClick={handleHireRequest}
							disabled={isLoading}
						/>
					</div>
				</div>
			</div>

			{/* Confirmation Popup */}
			<Confirmation
				isOpen={isConfirmationOpen}
				onClose={() => setIsConfirmationOpen(false)}
			/>
		</>
	);
};

export default HiringLabor;

import React, { useState } from "react";
import Button from "../Button/Button";
import Input_text from "../Input_Text/Input_text";

interface Storehouse {
	storehouse_name: string;
	storehouse_id: number;
	temperature_range: string;
	location: string;
	rent_per_sq: number;
	total_size: number;
	available_size: number;
	owner_name: string;
	owner_contact: string;
	image_url: string | null;
	descriptions: string | null;
}

interface PopupProps {
	isOpen: boolean;
	onClose: () => void;
	selectedStorehouse: Storehouse | null;
	token: string;
}

const HiringStore: React.FC<PopupProps> = ({
	isOpen,
	onClose,
	selectedStorehouse,
	token,
}) => {
	const [userInfo, setUserInfo] = useState({
		startingDate: "",
		finishingDate: "",
		sqft: "",
	});
	const [loading, setLoading] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserInfo((prevInfo) => ({
			...prevInfo,
			[name]: value,
		}));
	};

	const handleSubmit = async () => {
		// Ensure all input fields are filled
		if (!userInfo.startingDate || !userInfo.finishingDate || !userInfo.sqft) {
			alert("Please fill all fields.");
			return;
		}

		// Prepare the request body
		const requestBody = {
			storehouse_id: selectedStorehouse?.storehouse_id,
			start_date: userInfo.startingDate,
			end_date: userInfo.finishingDate,
			rental_size: parseInt(userInfo.sqft),
			active: 1,
		};

		try {
			setLoading(true);
			// Send the rent request
			const response = await fetch("http://127.0.0.1:8003/storehouse/rent/", {
				method: "POST",
				headers: {
					Authorization: `Token ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestBody),
			});

			// Check for response status
			if (!response.ok) {
				throw new Error("Failed to request rent");
			}

			// Parse the response
			const data = await response.json();
			alert("Rent request successful!");

			// Close the popup on success
			onClose();
		} catch (error) {
			// Handle error during API request
			console.error("Error during rent request:", error);
			alert("Error processing rent request.");
		} finally {
			// Stop loading
			setLoading(false);
		}
	};

	// Return null if the popup is closed
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-lime-100 bg-opacity-10">
			<div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
				<div className="content flex flex-col items-center space-y-5">
					{/* Displaying storehouse info */}
					<h2 className="text-2xl font-semibold">
						{selectedStorehouse?.storehouse_name}
					</h2>
					<p className="text-sm">Location: {selectedStorehouse?.location}</p>
					<p className="text-sm">
						Available Size: {selectedStorehouse?.available_size} Sqft
					</p>

					{/* Input fields for rent request */}
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
						<Input_text
							type="number"
							label="Enter the sqft"
							name="sqft"
							value={userInfo.sqft}
							onChange={handleInputChange}
							widthClass="w-full"
						/>
					</div>

					{/* Button to submit rent request */}
					<Button
						text={loading ? "Processing..." : "Request for Rent"}
						onClick={handleSubmit}
						disabled={loading}
					/>
				</div>
			</div>
		</div>
	);
};

export default HiringStore;

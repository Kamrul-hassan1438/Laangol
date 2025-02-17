import React, { useEffect, useRef, useState } from "react";
import user from "../../assets/user.png";
import edit from "../../assets/edit.png";
import Button from "../../components/Button/Button";
import Input_text from "../../components/Input_Text/Input_text";
import Toggle_Button from "../../components/Button/Toggle_Button";
import Availability from "../../components/Popup/Available_labor";

const Labor_profile: React.FC = () => {
	const [profileData, setProfileData] = useState({
		specialates: "",
		demand_fees: 0,
		experience: 0,
		status: "Unavailable",
	});

	const [isToggled, setIsToggled] = useState(false);
	const [userImage, setUserImage] = useState("");
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const popupRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const fetchLaborInfo = async () => {
			const token = localStorage.getItem("token");

			try {
				const response = await fetch(
					"http://127.0.0.1:8002/user/labour-info/",
					{
						method: "GET",
						headers: {
							Authorization: `Token ${token}`,
							"Content-Type": "application/json",
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch labor info.");
				}

				const data = await response.json();
				setProfileData({
					specialates: data.specialates || "",
					status: data.status || "Unavailable",
					demand_fees: (data.demand_fees || 0).toString(),
					experience: (data.experience || 0).toString(),
				});

				setIsToggled(data.status === "Available");

				const image = localStorage.getItem("image");
				if (image) {
					const fullImageUrl = image.startsWith("http")
						? image
						: `http://127.0.0.1:8000${image}`;
					localStorage.setItem("image", fullImageUrl);
					setUserImage(fullImageUrl);
				}
			} catch (error) {
				console.error("Error fetching labor info:", error);
			}
		};

		fetchLaborInfo();
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProfileData({
			...profileData,
			[name]: value,
		});
	};

	const handleToggleChange = (checked: boolean) => {
		setIsToggled(checked);
		setProfileData((prevData) => ({
			...prevData,
			status: checked ? "Available" : "Unavailable",
		}));

		if (checked) {
			setIsPopupOpen(true); // Open the popup when toggled to available
		} else {
			setIsPopupOpen(false); // Close the popup if toggled back to unavailable
		}
	};

	const handleCloseToggle = () => {
		setIsToggled(false); // Deactivate the toggle button
		setProfileData((prevData) => ({
			...prevData,
			status: "Unavailable",
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const laborData = {
			specialates: profileData.specialates,
			status: isToggled ? "Available" : "Unavailable",
			demand_fees: Number(profileData.demand_fees),
			experience: Number(profileData.experience),
		};

		const token2 = localStorage.getItem("token");
		try {
			const response = await fetch("http://127.0.0.1:8002/api/add-labour/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${token2}`,
				},
				body: JSON.stringify(laborData),
			});

			if (!response.ok) {
				throw new Error("Error in updating profile");
			}

			const result = await response.json();
			console.log("Profile updated successfully:", result);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	// Close popup and set toggle to unavailable when clicking outside of it
	const handleClickOutside = (event: MouseEvent) => {
		if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
			setIsPopupOpen(false);
			handleCloseToggle(); // Deactivate toggle
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<>
			<div className="user_profile w-full">
				<div className="heading text-3xl font-semibold text-lime-200">
					<h1>Labor Profile</h1>
				</div>
				<div className="content mt-9 flex flex-col space-y-11">
					<div className="top_info px-2 flex items-center justify-between">
						<div className="image_section flex items-end">
							<img
								src={userImage || user}
								alt="User"
								className="w-40 h-40 min-w-40 min-h-40 object-cover rounded-full border border-lime-200"
							/>
							<img src={edit} alt="" className="w-8" />
						</div>
						<div className="button_section">
							<Button onClick={handleSubmit} text="Update Profile" />
						</div>
					</div>
					<div className="bottom_info">
						<div className="user_info">
							<Input_text
								label="Specialties"
								name="specialates"
								value={profileData.specialates}
								onChange={handleInputChange}
							/>
							<Input_text
								label="Demand Fees"
								name="demand_fees"
								value={profileData.demand_fees}
								onChange={handleInputChange}
								type="number"
							/>
							<Input_text
								label="Experience (in years)"
								name="experience"
								value={profileData.experience}
								onChange={handleInputChange}
								type="number"
							/>
						</div>
					</div>
					<div className="active_status flex items-center justify-start space-x-3">
						<Toggle_Button
							checked={isToggled}
							onChange={handleToggleChange}
							label="Enable Feature"
							className="custom-toggle-class"
						/>
						<p>
							{isToggled ? "Available for hire till:" : "Unavailable for hire."}{" "}
						</p>
					</div>
				</div>
			</div>

			<Availability
				ref={popupRef}
				isOpen={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
				onCloseToggle={handleCloseToggle} // Pass the toggle deactivation function
			/>
		</>
	);
};

export default Labor_profile;

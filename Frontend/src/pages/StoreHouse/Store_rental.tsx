import { useState, useEffect } from "react";
import user from "../../assets/user.png";
import edit from "../../assets/edit.png";
import Button from "../../components/Button/Button";
import Input_text from "../../components/Input_Text/Input_text";
import Toggle_Button from "../../components/Button/Toggle_Button";

const Store_rental = () => {
	const [storehouseData, setStorehouseData] = useState({
		name: "",
		temperature_range: "",
		location: "",
		size: "",
		rent_per_sq: "",
		descriptions: "",
		status: false, // This reflects the boolean value for availability
	});
	const [isToggled, setIsToggled] = useState(false);

	// Fetch existing storehouse data on component load
	useEffect(() => {
		const fetchStorehouseData = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await fetch(
					"http://127.0.0.1:8003/user/storehouse-info/",
					{
						method: "GET",
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				);
				const data = await response.json();
				setStorehouseData({
					...data,
					status: data.Status === "Available", // Convert string to boolean
				});
				setIsToggled(data.Status === "Available"); // Set the toggle state
				console.log("data:", data);
			} catch (error) {
				console.error("Error fetching storehouse info:", error);
			}
		};

		fetchStorehouseData();
	}, []);

	// Handle update functionality
	const handleUpdate = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await fetch("http://127.0.0.1:8003/storehouse/add/", {
				method: "POST",
				headers: {
					Authorization: `Token ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: storehouseData.name,
					temperature_range: storehouseData.temperature_range,
					location: storehouseData.location,
					total_size: storehouseData.size,
					descriptions: storehouseData.descriptions,
					rent_per_sq: parseFloat(storehouseData.rent_per_sq),
					active: storehouseData.status ? 1 : 0,
				}),
			});

			if (response.ok) {
				const result = await response.json();
				console.log("Storehouse updated:", result);
				// Handle success (show a message, etc.)
			} else {
				console.error("Error updating storehouse");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<>
			<div className="user_profile w-full">
				<div className="heading text-3xl font-semibold text-lime-900">
					<h1>Storehouse Information</h1>
				</div>
				<div className="content mt-9 flex flex-col space-y-11">
					<div className="top_info px-2 flex items-center justify-between">
						<div className="image_section flex items-end">
							<img
								src={user}
								alt="User"
								className="w-32 bg-lime-200 p-2 rounded-full border border-lime-500"
							/>
							<img src={edit} alt="" className="w-8" />
						</div>
						<div className="button_section">
							<Button
								text="Update Storehouse Information"
								onClick={handleUpdate}
							/>
						</div>
					</div>
					<div className="bottom_info">
						<div className="user_info">
							<Input_text
								label="Name"
								name="name"
								value={storehouseData.name}
								onChange={(e) =>
									setStorehouseData({ ...storehouseData, name: e.target.value })
								}
							/>
							<Input_text
								label="Descriptions"
								name="descriptions"
								value={storehouseData.descriptions}
								onChange={(e) =>
									setStorehouseData({
										...storehouseData,
										descriptions: e.target.value,
									})
								}
							/>
							<Input_text
								label="Temperature range"
								name="temperature_range"
								value={storehouseData.temperature_range}
								onChange={(e) =>
									setStorehouseData({
										...storehouseData,
										temperature_range: e.target.value,
									})
								}
							/>
							<Input_text
								label="Location"
								name="location"
								value={storehouseData.location}
								onChange={(e) =>
									setStorehouseData({
										...storehouseData,
										location: e.target.value,
									})
								}
							/>
							<Input_text
								label="Size"
								name="size"
								value={storehouseData.size}
								onChange={(e) =>
									setStorehouseData({
										...storehouseData,
										size: e.target.value,
									})
								}
							/>
							<Input_text
								label="Rent per sqr"
								name="rent_per_sq"
								value={storehouseData.rent_per_sq}
								onChange={(e) =>
									setStorehouseData({
										...storehouseData,
										rent_per_sq: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<div className="active_status flex items-center justify-start space-x-3">
						<Toggle_Button
							checked={isToggled}
							onChange={(value) => {
								setIsToggled(value);
								setStorehouseData({ ...storehouseData, status: value });
							}}
							label="Enable Feature"
							className="custom-toggle-class"
						/>
						<p>{isToggled ? "Available for hire." : "Unavailable for hire."}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Store_rental;

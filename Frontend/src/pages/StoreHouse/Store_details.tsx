import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import store from "../../assets/warehouse.png";
import Short_card_2 from "../../components/Dynamic_card/Labor_and_Store";

interface StorehouseDetails {
	name: string;
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

const StoreDetails = () => {
	const { storehouseId } = useParams<{ storehouseId: string }>();
	const [storehouse, setStorehouse] = useState<StorehouseDetails | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const token = localStorage.getItem("token");

	useEffect(() => {
		const fetchStorehouseDetails = async () => {
			setLoading(true); // Start loading
			setError(null); // Reset any previous errors

			try {
				const response = await fetch(
					`http://127.0.0.1:8003/storehouse/${storehouseId}/details/`, // Fetch details based on storehouseId
					{
						method: "GET",
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error(`Error: ${response.status} ${response.statusText}`);
				}

				const data: StorehouseDetails = await response.json();
				setStorehouse(data);
				console.log(data);
			} catch (error) {
				console.error("Error fetching storehouse details:", error);
				setError("Failed to fetch storehouse details.");
			} finally {
				setLoading(false); // End loading
			}
		};

		fetchStorehouseDetails();
	}, [storehouseId, token]);

	if (loading) {
		return <p>Loading storehouse details...</p>;
	}

	if (error) {
		return <p>{error}</p>; // Show error message if there was an error
	}

	if (!storehouse) {
		return <p>No storehouse found.</p>; // Handle case where no storehouse was found
	}

	return (
		<div className="store_details container">
			<div className="heading text-2xl sm:text-3xl font-semibold text-lime-200">
				<h1>Store Management</h1>
			</div>

			<div className="content mt-11 flex flex-col space-y-8 text-lime-200">
				<div className="store_details">
					<div className="store_title flex items-center justify-center text-xl sm:text-2xl">
						<h1 className="bg-lime-800 px-10 sm:px-20 py-2 rounded-md">
							Store
						</h1>
					</div>

					<div className="store flex flex-col md:flex-row items-center justify-between space-y-5 md:space-y-0">
						<div className="store_info w-full flex flex-col md:flex-row items-start space-y-5 md:space-y-0 md:space-x-5">
							{/* Profile Image */}
							<div className="image_section">
								<img
									src={storehouse.image_url || store} // Use the fetched image URL or fallback to a default
									alt="Storehouse"
									className="w-full sm:w-60 md:w-80 bg-lime-100 p-2 rounded-lg border border-lime-200"
								/>
							</div>

							{/* Profile Info */}
							<div className="info_section flex flex-col space-y-2 items-start">
								<p className="text-lg sm:text-xl md:text-2xl">
									{storehouse.name}
								</p>

								{/* Taglines */}
								<div className="taglines flex flex-col md:flex-row items-center justify-center md:justify-normal space-y-2 md:space-y-0 md:space-x-3">
									<div className="tag px-2 py-1 bg-lime-100 bg-opacity-10 rounded-md border border-lime-200 text-sm">
										<p>{storehouse.total_size} Sqft</p>
									</div>
									<div className="tag px-2 py-1 bg-lime-100 bg-opacity-10 rounded-md border border-lime-200 text-sm">
										<p>{storehouse.location}</p>
									</div>
									<div className="tag px-2 py-1 bg-lime-100 bg-opacity-10 rounded-md border border-lime-200 text-sm">
										<p>{storehouse.owner_contact}</p>
									</div>
								</div>

								<div className="bottom_layer flex flex-col space-y-8">
									<p className="w-full md:w-fit text-sm md:text-base">
										{storehouse.descriptions || "No description available."}
									</p>

									<div className="connection flex flex-col md:flex-row items-center w-full space-y-5 md:space-y-0 md:space-x-7">
										<Button text={`${storehouse.rent_per_sq} BDT/Hr`} />
										<Button text="Chat With Owner" />
										<Button text="Contact Area Consultant" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="more_details_section">
					<div className="more_details">
						<h1>Find More Storehouses</h1>
						<div className="more_details_card flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
							{/* Example Short Cards - Replace with dynamic data as needed */}
							<Short_card_2
								imageSrc={store}
								name="Molla Warehouse"
								rate="250 BDT/Hr"
							/>
							<Short_card_2
								imageSrc={store}
								name="Molla Warehouse"
								rate="250 BDT/Hr"
							/>
							<Short_card_2
								imageSrc={store}
								name="Molla Warehouse"
								rate="250 BDT/Hr"
							/>
							<Short_card_2
								imageSrc={store}
								name="Molla Warehouse"
								rate="250 BDT/Hr"
							/>
							<Short_card_2
								imageSrc={store}
								name="Molla Warehouse"
								rate="250 BDT/Hr"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StoreDetails;

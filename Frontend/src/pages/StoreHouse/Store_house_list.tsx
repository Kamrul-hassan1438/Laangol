import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import store from "../../assets/warehouse.png";
import { Link } from "react-router-dom";
import HiringStore from "../../components/Popup/HiringStore";

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

const StoreList = () => {
	const [storehouses, setStorehouses] = useState<Storehouse[]>([]);
	const [selectedStorehouse, setSelectedStorehouse] =
		useState<Storehouse | null>(null);
	const [isHiringPopupOpen, setIsHiringPopupOpen] = useState(false);
	const token = localStorage.getItem("token");

	useEffect(() => {
		const fetchStorehouses = async () => {
			try {
				const response = await fetch(
					"http://127.0.0.1:8003/storehouse/by-region/",
					{
						method: "GET",
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch storehouses");
				}

				const data: Storehouse[] = await response.json();
				setStorehouses(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchStorehouses();
	}, [token]);

	const handleConnectClick = (storehouse: Storehouse) => {
		setSelectedStorehouse(storehouse); // Set the selected storehouse
		setIsHiringPopupOpen(true); // Open popup
	};

	const handleClosePopup = () => {
		setIsHiringPopupOpen(false);
		setSelectedStorehouse(null); // Clear selection after closing
	};

	return (
		<div className="store-list">
			<div className="headlines text-3xl font-semibold text-lime-200 text-start">
				<h1>Storehouse Management</h1>
			</div>
			<div className="mt-11 flex flex-col items-center space-y-8">
				<div className="heading text-3xl px-3 py-2 bg-lime-100 rounded-md border border-lime-100 text-lime-200">
					<h1>Hire a Storehouse</h1>
				</div>
				<div className="storehouses_list flex flex-col items-start space-y-7 w-full">
					{storehouses.length > 0 ? (
						storehouses.map((storehouse) => (
							<StorehouseCard
								key={storehouse.storehouse_id}
								storehouse={storehouse}
								onConnectClick={() => handleConnectClick(storehouse)} // Pass storehouse to popup
							/>
						))
					) : (
						<p>No storehouses available at the moment.</p>
					)}
				</div>
			</div>

			{/* HiringStore Popup */}
			<HiringStore
				isOpen={isHiringPopupOpen}
				onClose={handleClosePopup}
				selectedStorehouse={selectedStorehouse} // Pass selected storehouse to popup
				token={token || ""}
			/>
		</div>
	);
};

interface StorehouseCardProps {
	storehouse: Storehouse;
	onConnectClick: () => void;
}

const StorehouseCard: React.FC<StorehouseCardProps> = ({
	storehouse,
	onConnectClick,
}) => {
	return (
		<div className="storehouse-card flex md:flex-row items-center justify-between rounded-lg w-full">
			{/* Modify the Link to include the storehouse_id */}
			<Link
				to={`/dashboard/storehouse/store_list/storehouse_details/${storehouse.storehouse_id}`} // Include storehouse_id in the URL
				className="store_info w-full md:w-4/5 flex flex-col md:flex-row items-center space-x-5 mb-4 md:mb-0"
			>
				<div className="image_section">
					<img
						src={store}
						alt="Storehouse"
						className="w-full md:w-40 bg-lime-100 p-1 rounded-lg border border-lime-200"
					/>
				</div>
				<div className="info_section flex flex-col space-y-2 text-center md:text-left w-full">
					<p className="text-xl md:text-2xl font-semibold text-lime-200">
						{storehouse.storehouse_name}
					</p>
					<div className="taglines flex flex-wrap items-center justify-center md:justify-start space-x-3">
						<Tag label={`${storehouse.total_size} Sqft`} />
						<Tag label={`Available size: ${storehouse.available_size} Sqft`} />
						<Tag label={storehouse.location} />
						<Tag label={storehouse.owner_contact} />
					</div>
					<p className="text-sm md:text-base text-lime-200 mt-2">
						{storehouse.descriptions}
					</p>
				</div>
			</Link>

			<div className="connections flex flex-col space-y-10 md:space-y-5 md:ml-4">
				<Button text={`${storehouse.rent_per_sq} BDT/Day`} />
				<Button text="Connect" onClick={onConnectClick} />
			</div>
		</div>
	);
};

interface TagProps {
	label: string;
}

const Tag: React.FC<TagProps> = ({ label }) => {
	return (
		<div className="tag px-2 py-1 bg-lime-100 bg-opacity-10 rounded-md border border-lime-200 text-sm">
			<p>{label}</p>
		</div>
	);
};

export default StoreList;

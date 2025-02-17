import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import HiringLabor from "../../components/Popup/HiringLabor"; // Import Popup
import user from "../../assets/user.png";

// Define a type for the laborer data
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

const LaborList = () => {
	const [laborers, setLaborers] = useState<Laborer[]>([]);
	const [selectedLaborer, setSelectedLaborer] = useState<Laborer | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true); // Loading state
	const [error, setError] = useState<string | null>(null); // Error state

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsLoading(true); // Set loading state to true
		fetch("http://127.0.0.1:8002/laborers/by-region/", {
			method: "GET",
			headers: {
				Authorization: `Token ${token}`,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				setLaborers(data);
				setIsLoading(false); // Set loading to false when data is fetched
			})
			.catch((error) => {
				console.error("Error fetching laborers:", error);
				setError("Failed to load laborers. Please try again.");
				setIsLoading(false); // Ensure loading is set to false on error
			});
	}, []);

	const handleConnectClick = (laborer: Laborer) => {
		setSelectedLaborer(laborer); // Store the selected laborer
		setIsPopupOpen(true); // Open the popup
	};

	// Handle closing the popup
	const handleClosePopup = () => {
		setIsPopupOpen(false);
	};

	return (
		<>
			<div className="labor_list">
				{/* Headline */}
				<div className="headlines text-3xl font-semibold text-lime-200">
					<h1>Labor Management</h1>
				</div>

				<div className="mt-11 content flex flex-col items-center justify-between space-y-8">
					<div className="heading text-3xl px-3 py-2 bg-lime-100 rounded-md border border-lime-200 text-lime-200">
						<h1>Hire a Labor</h1>
					</div>

					{/* Loading and Error Handling */}
					{isLoading && <p>Loading laborers...</p>}
					{error && <p className="text-red-500">{error}</p>}

					<div className="labor_list flex flex-col items-center justify-center space-y-7 text-lime-200">
						{laborers.length > 0 ? (
							laborers.map((laborer) => (
								<div
									key={laborer.labour_id}
									className="labor flex items-center justify-between"
								>
									<div className="labor_info flex items-center space-x-5">
										{/* Profile Image */}
										<div className="image_section">
											<img
												src={laborer.image_url ? laborer.image_url : user}
												alt={laborer.laborer_name}
												className="w-40 h-w-40 min-w-40 min-h-40 object-cover rounded-full border border-lime-200"
											/>
										</div>

										{/* Profile Info */}
										<div className="info_section flex flex-col space-y-2 text-center md:text-left">
											<p className="text-xl md:text-2xl">
												{laborer.laborer_name}
											</p>

											{/* Taglines */}
											<div className="taglines flex flex-col md:flex-row items-center justify-center md:justify-normal space-y-2 md:space-y-0 md:space-x-3">
												<div className="tag px-2 py-1 bg-lime-100 bg-opacity-10 rounded-md border border-lime-200 text-sm">
													<p>{laborer.experience}+ years Experience</p>
												</div>
												<div className="tag px-2 py-1 bg-lime-100 bg-opacity-10 rounded-md border border-lime-200 text-sm">
													<p>{laborer.region_name}</p>
												</div>
												<div className="tag px-2 py-1 bg-lime-100 bg-opacity-10 rounded-md border border-lime-200 text-sm">
													<p>{laborer.status}</p>
												</div>

												<div className="tag px-2 py-1 bg-lime-100 bg-opacity-10 rounded-md border border-lime-200 text-sm">
													<p>+8801712345678</p>{" "}
													{/* Placeholder for real contact */}
												</div>
											</div>

											<p className="w-full md:w-fit text-sm md:text-base">
												{laborer.specialties}
											</p>
										</div>
									</div>

									{/* Connect Button */}
									<div className="connection flex flex-col justify-between space-y-4">
										<Button text={`${laborer.demand_fees} /hr`} />
										<Button
											text="Connect"
											onClick={() => handleConnectClick(laborer)}
										/>
									</div>
								</div>
							))
						) : !isLoading ? (
							<p>No laborers available.</p>
						) : null}
					</div>
				</div>

				{/* Popup for hiring labor */}
				<HiringLabor
					isOpen={isPopupOpen}
					onClose={handleClosePopup}
					laborer={selectedLaborer} // Pass selected laborer to the popup
				/>
			</div>
		</>
	);
};

export default LaborList;

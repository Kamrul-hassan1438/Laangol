import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import user from "../../assets/user.png";
import AreYouSure from "../../components/Popup/Are_You_Sure"; // Import the popup
import Confirmed from "../../components/Popup/Confirmed"; // Import the confirmed popup

interface PendingRequest {
	hire_id: number;
	amount: number;
	start_date: string;
	end_date: string;
	hirer_name: string;
	hirer_region: string;
	hirer_phone: string;
	hirer_image: string;
}

const Requests_labor = () => {
	const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
	const [token] = useState(localStorage.getItem("token"));
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isConfirmedOpen, setIsConfirmedOpen] = useState(false);
	const [selectedRequest, setSelectedRequest] = useState<PendingRequest | null>(
		null
	); // State for the selected request

	useEffect(() => {
		const fetchPendingRequests = async () => {
			try {
				const response = await fetch(
					"http://127.0.0.1:8002/api/pending-hire-requests/",
					{
						method: "GET",
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();
				setPendingRequests(data.pending_requests);
			} catch (error) {
				console.error("Error fetching pending hire requests:", error);
			}
		};

		fetchPendingRequests();
	}, [token]);

	const updateHireStatus = async (hireId: number) => {
		try {
			const response = await fetch(
				"http://127.0.0.1:8002/api/update-hire-status/",
				{
					method: "POST",
					headers: {
						Authorization: `Token ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ hire_id: hireId, status: "Accept" }),
				}
			);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			// Optionally refresh the requests after updating
			const updatedRequests = pendingRequests.filter(
				(request) => request.hire_id !== hireId
			);
			setPendingRequests(updatedRequests);
		} catch (error) {
			console.error("Error updating hire status:", error);
		}
	};

	const handleAcceptClick = (request: PendingRequest) => {
		setSelectedRequest(request); // Set the selected request
		setIsPopupOpen(true); // Open the "Are You Sure?" popup
	};

	const handleConfirm = () => {
		if (selectedRequest) {
			updateHireStatus(selectedRequest.hire_id); // Call the update function
			setIsConfirmedOpen(true); // Open the confirmed popup
		}
		setIsPopupOpen(false); // Close the "Are You Sure?" popup
	};

	return (
		<>
			<div className="labor_list">
				{/* Labor management UI */}
				<div className="mt-11 contents grid-flow-row space-y-5">
					{pendingRequests.map((request) => (
						<div
							key={request.hire_id}
							className="labor flex items-center space-x-5"
						>
							<div className="labor_info w-1/2 flex items-center space-x-5">
								<img
									src={request.hirer_image || user}
									alt={request.hirer_name}
									className="w-40 h-40 min-w-40 min-h-40 object-cover bg-lime-100 rounded-full p-1 border border-lime-200"
								/>
								{/* Profile Info */}
								<div className="info_section flex flex-col space-y-2">
									<p className="text-2xl">{request.hirer_name}</p>
									<p>
										Time: {request.start_date} to {request.end_date}
									</p>
									<p>Amount: ${request.amount}</p>
									<div className="connection flex items-center space-x-5">
										<Button
											text="Accept"
											onClick={() => handleAcceptClick(request)} // Call handleAcceptClick with the request
										/>
										<Button
											text="Reject"
											onClick={() => updateHireStatus(request.hire_id)}
										/>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* "Are You Sure?" Popup */}
			<AreYouSure
				isOpen={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
				onConfirm={handleConfirm} // Pass the confirm handler
			/>

			{/* Confirmed Popup */}
			<Confirmed
				isOpen={isConfirmedOpen}
				onClose={() => setIsConfirmedOpen(false)}
				hirerName={selectedRequest?.hirer_name} // Pass the hirer name to the confirmed popup
			/>
		</>
	);
};

export default Requests_labor;

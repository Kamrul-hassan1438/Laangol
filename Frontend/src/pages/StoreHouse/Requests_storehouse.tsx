import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import user from "../../assets/user.png";

interface RentalRequest {
  rental_id: number;
  rental_name: string;
  renter_image: string | null;
  amount: number;
  start_date: string;
  end_date: string;
  requested_size: number;
}

const Requests_storehouse = () => {
  const [pendingRequests, setPendingRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://127.0.0.1:8003/storehouse/pending-requests/",
          {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch pending requests");
        }

        const data = await response.json();
        setPendingRequests(data.pending_requests || []);
      } catch (error) {
        console.error("Error fetching pending requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  const updateRentalStatus = async (rentalId: number, status: string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8003/update-storehouse-pending-status/",
        {
          method: "POST", // Use POST for updating data
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rental_id: rentalId, status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update rental status");
      }

      const result = await response.json();
      console.log("Status updated successfully:", result);

      // Optionally, re-fetch the pending requests to update the UI
      // fetchPendingRequests();
    } catch (error) {
      console.error("Error updating rental status:", error);
    }
  };

  const handleAccept = (rentalId: number) => {
    updateRentalStatus(rentalId, "Accept");
  };

  const handleReject = (rentalId: number) => {
    updateRentalStatus(rentalId, "Reject");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="labor_list">
      {/* Labor management UI */}
      <div className="mt-11 contents grid-flow-row space-y-5">
        {pendingRequests.length === 0 ? (
          <p>No pending requests</p>
        ) : (
          pendingRequests.map((request) => (
            <div key={request.rental_id} className="labor flex items-center space-x-5">
              <div className="labor_info w-1/2 flex items-center space-x-5">
                <img
                  src={request.renter_image || user}
                  className="w-40 bg-lime-100 p-2 rounded-lg border border-lime-200"
                  alt="Renter"
                />
                {/* Profile Info */}
                <div className="info_section flex flex-col space-y-2">
                  <p className="text-2xl">{request.rental_name}</p>
                  <p>Time: {request.start_date} to {request.end_date}</p>
                  <p>Requested Size: {request.requested_size} Sqft</p>
                  <p>Amount: {request.amount} Tk</p>
                  <div className="connection flex items-center space-x-5">
                    <Button text="Accept" onClick={() => handleAccept(request.rental_id)} />
                    <Button text="Reject" onClick={() => handleReject(request.rental_id)} />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Requests_storehouse;

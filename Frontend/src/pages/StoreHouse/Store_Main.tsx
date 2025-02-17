import { useEffect, useState } from "react";
import search from "../../assets/search.png";
import getHired from "../../assets/getHired.png";
import storeHouse from "../../assets/warehouse.png";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

interface UpcomingRental {
  rental_id: number;
  renter_name: string;
  rental_size: number;
  rent_price: number;
  start_date: string;
  end_date: string;
}

interface StorehouseInfo {
  owner_name: string;
  name: string;
  descriptions: string; // Added this field
  size: number;
  available_size: number; // Changed to number for consistency
  region_name: string;
  owner_phone_number: string;
  temperature_range: string;
  rent_per_sq: number;
  location: string;
  upcoming_rentals: UpcomingRental[]; // Changed to use the UpcomingRental interface
}

const Store_main = () => {
  const [storehouseInfo, setStorehouseInfo] = useState<StorehouseInfo | null>(
    null
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8003/user/storehouse-info/", {
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
      .then((data) => setStorehouseInfo(data))
      .catch((error) =>
        console.error("Error fetching storehouse info:", error)
      );
  }, []);

  return (
    <>
      <div className="labor_main p-4 md:p-8">
        <div className="heading mb-10 md:mb-20 text-3xl md:text-4xl text-lime-200 font-semibold text-left flex items-center justify-between">
          <h1>Storehouse Management</h1>
          <Link to="store_requests" className="text-2xl">
            <Button text="Requests" px="px-4" />
          </Link>
        </div>

        <div className="contents">
          <div className="box_container flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16">
            <Link to="store_list">
              <div className="box bg-lime-100 bg-opacity-10 w-full md:w-auto py-6 px-10 md:px-20 border border-lime-500 rounded-lg flex flex-col items-center justify-center space-y-4 text-xl md:text-2xl text-lime-200 transition duration-300 ease-in-out transform hover:bg-lime-100">
                <img src={search} alt="Hire a labor" className="w-12 md:w-16" />
                <p>Rent a storehouse</p>
              </div>
            </Link>

            <Link to="store_rental">
              <div className="box bg-lime-100 bg-opacity-10 w-full md:w-auto py-6 px-10 md:px-20 border border-lime-500 rounded-lg flex flex-col items-center justify-center space-y-4 text-xl md:text-2xl text-lime-200 transition duration-300 ease-in-out transform hover:bg-lime-100">
                <img src={getHired} alt="Get Hired" className="w-12 md:w-16" />
                <p>Rent your Storehouse</p>
              </div>
            </Link>
          </div>

          <div className="profile_container mt-10 md:mt-20 flex flex-col items-center justify-center space-y-8 md:space-y-12 text-lime-200">
            <div className="heading bg-lime-100 px-8 md:px-12 py-2 md:py-3 rounded-md text-xl md:text-2xl">
              <h1>Your Profile</h1>
            </div>

            <div className="profile flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-3 px-4 md:px-12 py-3 rounded-md">
              <div className="image_section">
                <img
                  src={storeHouse}
                  alt="User"
                  className="w-36 md:w-48 bg-lime-100 p-2 rounded-lg border border-lime-00"
                />
              </div>

              <div className="info_section flex flex-col space-y-2 text-center md:text-left">
                {storehouseInfo ? (
                  <>
                    <p className="text-xl md:text-2xl">{storehouseInfo.name}</p>

                    <div className="taglines flex flex-col md:flex-row items-center justify-center md:justify-normal space-y-2 md:space-y-0 md:space-x-3">
                      <div className="tag px-2 py-1 bg-lime-100 bg-opacity-10 rounded-md border border-lime-100 text-sm">
                        <p>{storehouseInfo.size} square feet</p>
                      </div>
                      <div className="tag px-2 py-1 bg-lime-100 rounded-md border border-lime-800 text-sm">
                        <p>
                          Available size: {storehouseInfo.available_size} square
                          feet
                        </p>
                      </div>
                      <div className="tag px-2 py-1 bg-lime-100 rounded-md border border-lime-800 text-sm">
                        <p>Location: {storehouseInfo.location}</p>
                      </div>
                      <div className="tag px-2 py-1 bg-lime-100 bg-opacity-10 rounded-md border border-lime-100 text-sm">
                        <p>
                          Temperature range: {storehouseInfo.temperature_range}
                        </p>
                      </div>
                      <div className="tag px-2 py-1 bg-lime-100 bg-opacity-10 rounded-md border border-lime-100 text-sm">
                        <p>Region: {storehouseInfo.region_name}</p>
                      </div>
                      <div className="tag px-2 py-1 bg-lime-100 bg-opacity-10 rounded-md border border-lime-100 text-sm">
                        <p>
                          Owner's Phone: {storehouseInfo.owner_phone_number}
                        </p>
                      </div>
                    </div>

                    <p className="w-full md:w-fit text-sm md:text-base">
                      A {storehouseInfo.size} sq. ft. temperature-controlled
                      storehouse available for rent at BDT{" "}
                      {storehouseInfo.rent_per_sq} per day. A security deposit
                      is required.
                    </p>

                    <div className="upcoming_rentals mt-4">
                      {storehouseInfo.upcoming_rentals.length > 0 ? (
                        storehouseInfo.upcoming_rentals.map((rental) => (
                          <div
                            key={rental.rental_id}
                            className="tag px-2 py-1 bg-lime-100 bg-opacity-10 rounded-md border border-lime-100 text-sm"
                          >
                            <p>
                              <strong>
                                {" "}
                                Renter Name:{rental.renter_name} Rental Size:{" "}
                                {rental.rental_size} square feet {"  "} Rent
                                Price: BDT {rental.rent_price} Start Date:
                                {rental.start_date} End Date: {rental.end_date}
                              </strong>
                            </p>
                          </div>
                        ))
                      ) : (
                        <p>No upcoming rentals.</p>
                      )}
                    </div>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Store_main;

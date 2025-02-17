import React, { useEffect, useState } from "react";
import Laangol from "../../assets/laangol.png";
import Button from "../../components/Button/Button";
import Profile from "../../components/Profile/Profile";
import { Link } from "react-router-dom";
import axios from "axios";

type User = {
  user_id: number;
  name: string;
  number: string;
  type: string;
  image: string | null;
};

const User_Management = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [userCounts, setUserCounts] = useState({
    total_users: 0,
    total_farmers: 0,
    total_consumers: 0,
  });

  useEffect(() => {
	const token = localStorage.getItem("token"); 
    axios
      .get("http://127.0.0.1:8004/user-count/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setUserCounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user counts:", error);
      });

    axios
      .get("http://127.0.0.1:8004/all-users/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <>
      <div className="profile_section">
        <div className="top_part">
          <div className="heading text-3xl font-semibold text-lime-100">
            <h2>User Management</h2>
          </div>
        </div>
        <div className="display mt-10 flex flex-col space-y-10">
          <div className="display_info p-2 flex items-center justify-start space-x-5 text-lime-200 text-2xl border-2 border-lime-100 bg-lime-100 bg-opacity-10 rounded-md">
            <div className="info flex items-center space-x-3">
              <p className="text-4xl">{userCounts.total_users}</p>
              <div className="text flex flex-col leading-7">
                <p>Total</p>
                <p>Users</p>
              </div>
            </div>
            <div className="info flex items-center space-x-3">
              <p className="text-4xl">{userCounts.total_farmers}</p>
              <div className="text flex flex-col leading-7">
                <p>Total</p>
                <p>Farmers</p>
              </div>
            </div>
            <div className="info flex items-center space-x-3">
              <p className="text-4xl">{userCounts.total_consumers}</p>
              <div className="text flex flex-col leading-7">
                <p>Total</p>
                <p>Consumers</p>
              </div>
            </div>
          </div>
          <div className="user_table grid grid-cols-2 gap-y-6">
            {userData.map((user) => (
              <div key={user.user_id} className="user flex items-center space-x-5">
                <div className="user_name p-2 border-2 bg-lime-100 bg-opacity-10 border-lime-100 rounded-md w-1/2">
                  <p>{user.name}</p>
                </div>
                <Link to={`/user_profile/${user.user_id}`}>
                  <Button text="View Profile" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default User_Management;

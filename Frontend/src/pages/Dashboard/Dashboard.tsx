import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Laangol from "../../assets/laangol.png";
import Profile from "../../components/Profile/Profile";
import left from "../../assets/left.png";
import right from "../../assets/right.png";
import user from "../../assets/user.png";
import { Link } from "react-router-dom";
const Dashboard = () => {
	const [userImage, setUserImage] = useState<string>(user);

	useEffect(() => {
		const image = localStorage.getItem("image");

		if (
			image &&
			image !== "null" &&
			image !== "undefined" &&
			image.trim() !== ""
		) {
			const fullImageUrl = image.startsWith("http")
				? image
				: `http://127.0.0.1:8000/${image}`;
			setUserImage(fullImageUrl);
		} else {
			setUserImage(user);
		}
	}, []);

	return (
		<>
			<div className="flex flex-col h-screen bg-lime-50">
				{/* Top Part */}
				<div className="top_part flex items-center justify-between px-4 py-2">
					<Link to="/">
						<img src={Laangol} alt="Laangol" className=" sm:w-48 md:w-56" />
					</Link>
					<Profile
						imageSrc={userImage}
						menuItems={[
							{ label: "Profile", path: "/dashboard/user" },
							{ label: "Logout", path: "/login" },
						]}
					/>
				</div>

				{/* Display Part */}
				<div className="display m-2 h-full flex flex-col space-y-1">
					<div className="arrow ml-24 flex w-8">
						<img src={left} alt="Left Arrow" />
						<img src={right} alt="Right Arrow" />
					</div>
					<div className="display_part mx-5 mb-5 flex flex-grow space-x-4 overflow-hidden">
						{/* Sidebar */}
						<div className="sidebar flex-shrink-0 z-10">
							<Sidebar />
						</div>

						{/* Main Content */}
						<div className="main flex-grow bg-lime-100 bg-opacity-10 border border-lime-400 rounded-md p-4 overflow-y-auto">
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;

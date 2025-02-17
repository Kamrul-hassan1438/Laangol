import { Outlet } from "react-router-dom";
import Laangol from "../../assets/laangol.png";
import Profile from "../../components/Profile/Profile";
import left from "../../assets/left.png";
import right from "../../assets/right.png";
import user from "../../assets/user.png";

const Admin_dashboard = () => {
	return (
		<>
			<div className="flex flex-col h-screen bg-lime-50">
				{/* Top Part */}
				<div className="top_part flex items-center justify-between px-4 py-2">
					<img src={Laangol} alt="Laangol" className="w-40 sm:w-48 md:w-56" />
					<Profile
						imageSrc={user}
						menuItems={[
							{ label: "Profile", path: "admin_profile" },
							{ label: "Logout", path: "/login" },
						]}
					/>
				</div>

				{/* Display Part */}
				<div className="display min-h-screen flex flex-col space-y-1">
					<div className="arrow ml-24 flex w-8">
						<img src={left} alt="" />
						<img src={right} alt="" />
					</div>
					<div className="display_part mx-5 mb-5 flex flex-grow space-x-4 overflow-hidden">
						{/* Main Content */}
						<div className="main flex-grow bg-lime-100 bg-opacity-10 border border-lime-100 rounded-md p-4 overflow-y-auto">
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Admin_dashboard;

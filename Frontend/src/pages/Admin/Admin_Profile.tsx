import { useState } from "react";
import user from "../../assets/user.png";
import edit from "../../assets/edit.png";
import Button from "../../components/Button/Button";
import Input_text from "../../components/Input_Text/Input_text";

const Admin_user = () => {
	// State to hold user input values
	const [userInfo, setUserInfo] = useState({
		name: "",
		email: "",
		phone: "",
	});

	// Handle input change
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserInfo((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<>
			<div className="user_profile w-full">
				<div className="heading text-3xl font-semibold text-lime-200">
					<h1>User Profile</h1>
				</div>
				<div className="content mt-9 flex flex-col space-y-11">
					<div className="top_info px-2 flex items-center justify-between">
						<div className="image_section flex items-end">
							<img
								src={user}
								alt="User"
								className="w-32 bg-lime-200 p-2 rounded-full border border-lime-100"
							/>
							<img src={edit} alt="Edit" className="w-8" />
						</div>
						<div className="button_section">
							<Button text="Update profile" />
						</div>
					</div>
					<div className="bottom_info">
						<div className="user_info space-y-4">
							<Input_text
								label="Name"
								name="name"
								value={userInfo.name}
								onChange={handleInputChange}
							/>
							<Input_text
								label="Email"
								name="email"
								value={userInfo.email}
								onChange={handleInputChange}
							/>
							<Input_text
								label="Phone"
								name="phone"
								value={userInfo.phone}
								onChange={handleInputChange}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Admin_user;

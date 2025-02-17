import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import bg from "../../assets/login_and_signup_banner.png";
import Authentication_Input from "../../components/Authentication_Input/Authentication_Input";
import RadioButton from "../../components/Button/RadioButton";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import Warning from "../../components/Popup/Warning";
import TermsAndCondition from "../../components/Popup/TermsAndCondition";

// Define the form data type
interface FormData {
	name: string;
	email: string;
	phone: string;
	password: string;
	confirm_password: string;
}

const Signup_page = () => {
	// Form state management
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		phone: "",
		password: "",
		confirm_password: "",
	});

	// State to manage the selected user type
	const [selectedUserType, setSelectedUserType] = useState<string>("farmer");

	// State for handling the popup visibility and messages
	const [isWarningOpen, setIsWarningOpen] = useState<boolean>(false);
	const [warningMessage, setWarningMessage] = useState<string>("");

	// State for controlling the Terms and Conditions popup
	const [isTermsOpen, setIsTermsOpen] = useState<boolean>(false);

	const navigate = useNavigate();

	// Handle form input changes
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Handle radio button change
	const handleRadioChange = (value: string) => setSelectedUserType(value);

	// Show warning popup and optionally close it after a delay
	const showWarningPopup = (message: string, redirectPath?: string) => {
		setWarningMessage(message);
		setIsWarningOpen(true);

		if (redirectPath) {
			setTimeout(() => {
				setIsWarningOpen(false);
				navigate(redirectPath);
			}, 2000); // Wait 2 seconds before redirecting
		}
	};

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const { name, email, phone, password, confirm_password } = formData;

		// Basic validation (e.g., password match)
		if (password !== confirm_password) {
			showWarningPopup("Passwords do not match. Please try again.");
			return;
		}

		const payload = {
			name,
			email,
			number: phone,
			region_id: null,
			active: 1,
			password,
			type: selectedUserType.toUpperCase(), // Ensure uppercase format
		};

		try {
			const response = await fetch("http://127.0.0.1:8000/signup/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const errorData = await response.json();
				showWarningPopup("Signup failed. Please check your input.");
				console.error("Error during signup:", errorData);
				return;
			}

			// Success case
			showWarningPopup("User account created successfully.", "/login");
		} catch (error) {
			console.error("Error during signup", error);
			showWarningPopup(
				"An error occurred during signup. Please try again later."
			);
		}
	};

	return (
		<>
			<header>
				<Navbar />
			</header>
			<div className="login_page bg-lime-50 flex items-center justify-between">
				<div className="login_content pl-40 flex flex-col items-baseline gap-y-10 font-medium">
					<h1 className="text-5xl text-lime-200">Signup</h1>
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-y-6 w-full"
					>
						<Authentication_Input
							type="text"
							name="name"
							placeholder="Name"
							value={formData.name}
							onChange={handleInputChange}
							required
						/>
						<Authentication_Input
							type="email"
							name="email"
							placeholder="Email"
							value={formData.email}
							onChange={handleInputChange}
							required
						/>
						<Authentication_Input
							type="tel"
							name="phone"
							placeholder="Phone Number"
							value={formData.phone}
							onChange={handleInputChange}
							required
						/>
						<Authentication_Input
							type="password"
							name="password"
							placeholder="Password"
							value={formData.password}
							onChange={handleInputChange}
							required
						/>
						<Authentication_Input
							type="password"
							name="confirm_password"
							placeholder="Confirm Password"
							value={formData.confirm_password}
							onChange={handleInputChange}
							required
						/>

						<div className="user_type_selection flex flex-col gap-y-2 text-lime-200">
							<p>Select your user type</p>
							<div className="flex gap-x-6">
								<RadioButton
									label="Farmer"
									value="FARMER"
									name="userType"
									checked={selectedUserType === "farmer"}
									onChange={handleRadioChange}
								/>
								<RadioButton
									label="Consumer"
									value="CONSUMER"
									name="userType"
									checked={selectedUserType === "consumer"}
									onChange={handleRadioChange}
								/>
							</div>
						</div>

						<div className="flex items-center">
							<input
								id="terms-checkbox"
								type="checkbox"
								className="w-4 h-4 text-lime-200 bg-gray-100 border-gray-300 rounded focus:ring-lime-200 accent-lime-200"
								required
							/>
							<label
								htmlFor="terms-checkbox"
								className="ms-2 text-sm font-medium text-gray-900"
							>
								I agree with the{" "}
								<a
									href="#"
									className="text-lime-200 transition duration-400 ease-in-out hover:underline"
									onClick={(e) => {
										e.preventDefault(); // Prevent page jump
										setIsTermsOpen(true); // Open the terms popup
									}}
								>
									terms and conditions
								</a>
								.
							</label>
						</div>

						<Button text="Signup" px="px-8" width="w-full" />

						<p className="text-lime-200">
							Already have an account?{" "}
							<Link
								to="/login"
								className="text-lime-100 hover:text-lime-200 hover:underline"
							>
								Sign in
							</Link>
						</p>
					</form>
				</div>
				<img src={bg} alt="Signup banner" />
			</div>

			{/* Warning Popup */}
			<Warning
				isOpen={isWarningOpen}
				onClose={() => setIsWarningOpen(false)}
				title="Signup Status"
				message="Back to login"
			/>

			{/* Terms and Conditions Popup */}
			<TermsAndCondition
				isOpen={isTermsOpen}
				onClose={() => setIsTermsOpen(false)} // Close the popup when OK is clicked
			/>
		</>
	);
};

export default Signup_page;

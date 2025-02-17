import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import bg from "../../assets/login_and_signup_banner.png";
import Navbar from "../../components/Navbar/Navbar";
import Authentication_Input from "../../components/Authentication_Input/Authentication_Input";
import Button from "../../components/Button/Button";
import Warning from "../../components/Popup/Warning";
const Login_page = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isWarningOpen, setIsWarningOpen] = useState(false); // State for Warning popup

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();

		const payload = {
			email,
			password,
		};

		try {
			const response = await fetch("http://127.0.0.1:8000/login/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.error("Login failed:", errorData);
				setIsWarningOpen(true);
				return;
			}

			const data = await response.json();
			localStorage.setItem("token", data.token);
			localStorage.setItem("image", data.user.image);
			localStorage.setItem("user_id", data.user_id);
			console.log(data.user.image);
			console.log("Login successful");
			navigate("/dashboard");
		} catch (error) {
			console.error("Error during login:", error);
			setIsWarningOpen(true); 
		}
	};

	return (
		<div>
			<header>
				<nav>
					<Navbar />
				</nav>
			</header>
			<div className="login_page bg-lime-50 flex items-center justify-between ">
				<div className="login_content pl-40 flex flex-col items-baseline gap-y-10 font-medium">
					<div className="heading text-5xl">
						<h1>Login</h1>
					</div>
					<div className="form">
						<form onSubmit={handleLogin} className="flex flex-col gap-y-6">
							<Authentication_Input
								type="email"
								name="email"
								placeholder="Email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full"
							/>
							<Authentication_Input
								type="password"
								name="password"
								placeholder="Password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full"
							/>
							<Button text="Login" px="px-8" width="w-auto" />
							<a className="text-lime-200 transition duration-300 ease-in-out transform hover:text-lime-100">
								Forgot Password?
							</a>
							<p>
								Dont have an account?{" "}
								<Link to="/signup">
									<span className="text-lime-900">Sign up</span>
								</Link>
							</p>
						</form>
					</div>
				</div>
				<img src={bg} className="" alt="Background" />

				{/* Warning Popup Component */}
				<Warning
					message="Incorrect email or password. Please try again."
					isOpen={isWarningOpen}
					onClose={() => setIsWarningOpen(false)}
				/>
			</div>
		</div>
	);
};

export default Login_page;

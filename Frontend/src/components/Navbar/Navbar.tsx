import { Link } from "react-router-dom";
import Laangol from "../../assets/laangol.png";
import Button from "../Button/Button";

const Navbar = () => {
	const items = [
		{ name: "Dashboard", path: "/dashboard" },
	];

	return (
		<div>
			<nav className="p-7 flex items-center justify-between bg-lime-50">
				<div className="logo-panel">
					<Link to="/">
						<img src={Laangol} alt="Laangol Logo" className="w-60" />
					</Link>
				</div>
				<div className="max-w-full">
					<ul className="flex flex-row items-center gap-16">
						{items.map((item, index) => (
							<li
								key={index}
								className="scale-110 font-medium transition ease-in-out delay-50 hover:text-lime-700 duration-300"
							>
								<Link to={item.path}>{item.name}</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="mr-28">
					<Link to="/login">
						<Button text="Sign in" px="px-8" width="w-auto" />
					</Link>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;

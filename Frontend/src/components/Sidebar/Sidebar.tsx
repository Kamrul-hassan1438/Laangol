import { Link } from "react-router-dom";
import { useState } from "react";
import Cart from "../../assets/cart.png";
import Chat from "../../assets/chat.png";
import Crop from "../../assets/crop.png";
import Helpline from "../../assets/helpline.png";
import Labor from "../../assets/labor.png";
import Marketplace from "../../assets/marketplace.png";
import Storehouse from "../../assets/storehouse.png";

// Define types for menu items
interface MenuItem {
	img: string;
	text: string;
	path: string;
}

// Constants (moved Chat and Cart to a separate array for bottom alignment)
const menuItems: MenuItem[] = [
	{ img: Marketplace, text: "Marketplace", path: "marketplace" },
	{ img: Labor, text: "Labor Management", path: "labor" },
	{ img: Storehouse, text: "Storehouse Rental", path: "storehouse" },
	{ img: Helpline, text: "AgroAegis", path: "agroaegis" },
];

const bottomItems: MenuItem[] = [
	{ img: Chat, text: "Chat", path: "chat" },
	{ img: Cart, text: "Cart", path: "cart" },
];

// Sidebar Component
const Sidebar: React.FC = () => {
	const [expanded, setExpanded] = useState<boolean>(false);

	// Handlers for mouse events
	const handleMouseEnter = (): void => setExpanded(true);
	const handleMouseLeave = (): void => setExpanded(false);

	return (
		<div
			className={`h-full bg-lime-100 rounded-md transition-all duration-500 ease-in-out transform ${
				expanded
					? "p-5 w-40 sm:w-60 md:w-64 lg:w-80 z-10 bg-lime-100 bg-opacity-10"
					: "w-14"
			} flex flex-col justify-between`}
			// Hover events applied to the outer container
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{/* Top Section (middle part of the sidebar) */}
			<div className="flex flex-col gap-y-6 text-lime-700 font-medium">
				{menuItems.map((item, index) => (
					<Link
						to={item.path}
						key={index}
						className={`transition-all duration-200 ease-in-out flex items-center gap-x-3 md:gap-x-5 p-2 hover:bg-lime-100 hover:scale-110 rounded-lg ${
							expanded ? "w-full" : "w-14"
						}`}
					>
						<img
							src={item.img}
							alt={item.text}
							className="w-6 sm:w-8 md:w-10"
						/>
						{expanded && (
							<p className="text-sm sm:text-md md:text-base lg:text-base">
								{item.text}
							</p>
						)}
					</Link>
				))}
			</div>

			{/* Bottom Section (aligned at the bottom) */}
			<div className="flex flex-col gap-y-6 mb-4 text-lime-900">
				{bottomItems.map((item, index) => (
					<Link
						to={item.path}
						key={index}
						className={`transition-all duration-200 ease-in-out flex items-center gap-x-3 md:gap-x-5 p-2 hover:bg-lime-100 hover:scale-110 rounded-lg ${
							expanded ? "w-full" : "w-14"
						}`}
					>
						<img
							src={item.img}
							alt={item.text}
							className="w-6 sm:w-8 md:w-10"
						/>
						{expanded && (
							<p className="text-sm sm:text-md md:text-base lg:text-base">
								{item.text}
							</p>
						)}
					</Link>
				))}

				{/* Footer */}
				<p
					className={`fractor text-xs  text-lime-200 ${
						expanded ? "opacity-100" : "opacity-0"
					}`}
				>
					Laangol 2024. All rights reserved.
				</p>
			</div>
		</div>
	);
};

export default Sidebar;

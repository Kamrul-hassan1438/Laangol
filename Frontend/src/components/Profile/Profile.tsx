import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface MenuItem {
	label: string;
	path?: string;
	action?: () => void;
}

interface ProfileProps {
	imageSrc: string;
	menuItems: MenuItem[];
	buttonClassName?: string;
	dropdownClassName?: string;
}

const Profile: React.FC<ProfileProps> = ({
	imageSrc,
	menuItems,
	buttonClassName = "bg-lime-100 rounded-full transition duration-300 ease-in-out transform hover:bg-lime-100 hover:scale-105", // Default styles
	dropdownClassName = "w-48 bg-white shadow-lg rounded-lg py-2", // Default styles
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown element

	// Toggle the dropdown on button click
	const toggleDropdown = () => setIsOpen(!isOpen);

	// Close the dropdown when clicking outside
	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	// Add event listener to detect clicks outside the dropdown
	useEffect(() => {
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	// Close the dropdown after selecting a menu option
	const handleOptionClick = (item: MenuItem) => {
		setIsOpen(false);
		if (item.path) navigate(item.path);
		if (item.action) item.action();
	};

	return (
		<div ref={dropdownRef} className="relative inline-block">
			{/* Button with Image */}
			<button
				onClick={toggleDropdown}
				className={`flex items-center ${buttonClassName}`}
			>
				<img
					src={imageSrc}
					alt="profile button"
					className="w-12 h-12 min-w-12 min-h-12 object-cover rounded-full border border-lime-200"
				/>
			</button>

			{/* Dropdown Menu */}
			{isOpen && (
				<ul
					className={`absolute right-0 mt-2 ${dropdownClassName} transform transition-transform duration-300 ease-out z-50`}
				>
					{menuItems.map((item, index) => (
						<li
							key={index}
							className="px-4 py-2 hover:bg-lime-100 transition duration-300 ease-in-out transform cursor-pointer"
							onClick={() => handleOptionClick(item)}
						>
							{item.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Profile;

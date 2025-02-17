import React, { useState } from "react";
import Down from "../../assets/arrowDown.png";

interface CardProps {
	imageSrc: string;
	title: string;
	description: string; // Additional prop for the details to show on hover
}

const Card: React.FC<CardProps> = ({ imageSrc, title, description }) => {
	const [isHovered, setIsHovered] = useState(false); // State to track hover

	return (
		<div
			className="relative h-128 w-96 border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<img
				src={imageSrc}
				alt={title}
				className={`w-full h-full object-cover object-center transition-opacity duration-500 ${
					isHovered ? "opacity-50" : "opacity-100"
				}`}
			/>
			<div
				className={`absolute inset-0 flex flex-col items-center justify-center gap-y-6 bg-lime-800 bg-opacity-50 text-lime-100 p-4 italic transition-opacity duration-500 ${
					isHovered ? "opacity-100" : "opacity-0"
				}`}
			>
				<h3 className="text-5xl font-medium">{title}</h3>
				<p className="text-center">{description}</p> {/* Show details here */}
				<img src={Down} alt="Arrow down" className="w-10 h-10" />
			</div>
		</div>
	);
};

export default Card;

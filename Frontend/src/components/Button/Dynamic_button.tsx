import React, { useState } from "react";

interface ButtonProps {
	initialLabel: string;
	hoverLabel: string;
	onClick?: () => void;
}

const Dynamic_button: React.FC<ButtonProps> = ({
	initialLabel,
	hoverLabel,
	onClick,
}) => {
	const [label, setLabel] = useState(initialLabel);

	return (
		<button
			className={` mt-2 px-4 py-2 bg-lime-100 text-lime-200 rounded transition duration-200 ease-in-out transform hover:bg-lime-200 hover:text-white hover:scale-105 hover:shadow-lg`}
			onMouseEnter={() => setLabel(hoverLabel)}
			onMouseLeave={() => setLabel(initialLabel)}
			onClick={onClick}
		>
			<span className="transition-all duration-300 ease-in-out">{label}</span>
		</button>
	);
};

export default Dynamic_button;

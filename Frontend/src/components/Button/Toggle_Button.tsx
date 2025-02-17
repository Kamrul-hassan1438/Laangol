import React from "react";

interface ToggleSwitchProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label?: string;
	className?: string;
}

const Toggle_Button: React.FC<ToggleSwitchProps> = ({
	checked,
	onChange,
	className = "",
}) => {
	const handleToggle = () => {
		onChange(!checked);
	};

	return (
		<label className={`inline-flex items-center cursor-pointer ${className}`}>
			<input
				type="checkbox"
				className="sr-only peer"
				checked={checked}
				onChange={handleToggle}
			/>
			<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-lime-800 rounded-full peer dark:bg-lime-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-lime-800"></div>
		</label>
	);
};

export default Toggle_Button;

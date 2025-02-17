import React, { ChangeEvent } from "react";

interface InputProps {
	type?: string;
	name: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	className?: string;
	value: string; // Add the value prop
	onChange: (e: ChangeEvent<HTMLInputElement>) => void; // Add the onChange prop
}

const Authentication_Input: React.FC<InputProps> = ({
	type = "text",
	name,
	placeholder = "",
	required = false,
	disabled = false,
	className = "",
	value, // Destructure the value prop
	onChange, // Destructure the onChange prop
}) => {
	return (
		<div className={`relative ${className}`}>
			<input
				id={name}
				type={type}
				name={name}
				required={required}
				disabled={disabled}
				className={`w-81 pl-4 border-2 bg-lime-50 py-2 rounded-md text-lime-200  border-lime-100 placeholder-lime-200 focus:border-lime-200 focus:outline-none`}
				placeholder={placeholder}
				value={value} // Bind the value prop
				onChange={onChange} // Bind the onChange prop
			/>
		</div>
	);
};

export default Authentication_Input;

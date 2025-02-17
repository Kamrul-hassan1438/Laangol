import React from "react";

interface InputBoxProps {
	label?: string; // Optional label
	type?: string;
	name: string;
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	widthClass?: string;
	readOnly?: boolean;
}

const Input_text: React.FC<InputBoxProps> = ({
	label,
	type = "text",
	name,
	value,
	onChange,
	widthClass = "w-full md:w-1/2 lg:w-1/3",
	readOnly = false,
}) => {
	return (
		<div className={`flex flex-col mb-4 ${widthClass}`}>
			{label && <label className="mb-2 text-lime-200">{label}</label>}
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				readOnly={readOnly}
				className="px-4 py-2 border border-lime-100 bg-lime-100 bg-opacity-10 rounded-md focus:outline-none"
			/>
		</div>
	);
};

export default Input_text;

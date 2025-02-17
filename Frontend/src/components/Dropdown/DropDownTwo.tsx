import { useState } from "react"; // Ensure useState is imported

interface Option<T> {
	value: T;
	label: string;
}

interface DropdownProps<T> {
	label: string;
	options: Option<T>[];
	onChange: (selectedValue: T) => void;
	value: T | null; // Accept value prop to handle null
	placeholder?: string;
	className?: string;
}

const Dropdown = <T,>({
	label,
	options,
	onChange,
	value, // Accept value prop
	placeholder = "Choose an option",
	className = "",
}: DropdownProps<T>) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectedOption = options.find((option) => option.value === value); // Find the selected option

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleOptionClick = (option: Option<T>) => {
		onChange(option.value); // Pass selected value to parent
		setIsOpen(false);
	};

	return (
		<div className={`relative inline-block ${className}`}>
			<label className="block mb-2 text-base font-medium">{label}</label>
			<button
				type="button"
				className="bg-lime-100 bg-opacity-10 text-lime-200 border border-lime-100 rounded-md w-full p-2.5 text-left"
				onClick={toggleDropdown}
			>
				{selectedOption ? selectedOption.label : placeholder}{" "}
				{/* Display selected label */}
			</button>

			{isOpen && (
				<div className="absolute z-10 mt-2 w-full bg-lime-50 border border-lime-200 rounded-md">
					{options.map((option, index) => (
						<div
							key={index}
							className="px-4 py-2 cursor-pointer hover:bg-lime-100 text-lime-900"
							onClick={() => handleOptionClick(option)}
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Dropdown;

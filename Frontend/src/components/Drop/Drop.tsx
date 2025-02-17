import React, { useState } from "react";

interface DropsProps {
	label: string;
	options: string[];
	onSelect: (option: string) => void;
}

const Drop: React.FC<DropsProps> = ({ label, options, onSelect }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);

	const handleOptionClick = (option: string) => {
		setSelectedOption(option);
		onSelect(option);
		setIsOpen(false);
	};

	return (
		<div className="relative inline-block text-left">
			<div>
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					{selectedOption || label}
					<svg
						className="-mr-1 ml-2 h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M5.23 7.21a.75.75 0 011.06.02L10 10.47l3.71-3.24a.75.75 0 111.04 1.08l-4.25 3.71a.75.75 0 01-1.04 0l-4.25-3.71a.75.75 0 01-.02-1.06z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>

			{isOpen && (
				<div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1">
						{options.map((option) => (
							<button
								key={option}
								onClick={() => handleOptionClick(option)}
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
							>
								{option}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Drop;

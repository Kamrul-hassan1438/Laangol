import React from "react";

interface ButtonWithImgProps {
	imgSrc: string;
	altText: string;
	buttonText: string;
	expanded: boolean; // Control text, background, and border visibility
	onClick?: () => void;
	imgSize?: string; // Size for the image
}

const ButtonWithImg: React.FC<ButtonWithImgProps> = ({
	imgSrc,
	altText,
	buttonText,
	expanded,
	onClick,
	imgSize = "w-10 h-10", // Default image size
}) => {
	return (
		<button
			onClick={onClick}
			className={`py-1 w-64 pl-2 flex items-center space-x-7 rounded-lg transition duration-300 ease-in-out transform 
        ${
					expanded
						? `bg-lime-100 bg-opacity-10 border border-lime-100 hover:bg-lime-100 hover:scale-105`
						: "border-transparent bg-transparent"
				} // Hide background and border when not expanded
      `}
		>
			<img src={imgSrc} alt={altText} className={imgSize} />
			{expanded && (
				<span className={`text-lg font-medium text-lime-200`}>
					{buttonText}
				</span>
			)}
		</button>
	);
};

export default ButtonWithImg;

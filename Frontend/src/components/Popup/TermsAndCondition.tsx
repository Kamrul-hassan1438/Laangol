import React from "react";
import Button from "../Button/Button";

interface PopupProps {
	isOpen: boolean;
	onClose: () => void;
}

const TermsAndCondition: React.FC<PopupProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-lime-100 bg-opacity-10">
			<div className="bg-white p-6 rounded-lg shadow-xl">
				<div className="content flex flex-col items-center space-y-5">
					<div className="text flex flex-col items-start space-y-2">
						<h2 className="text-3xl font-semibold text-center text-lime-200">
							Terms and Conditions
						</h2>
						<p className="text-center text-lime-200">
							1. By accessing and using Laangol, you agree to these terms and
							conditions, all applicable laws, and regulations. These terms
							apply to all users, including but not limited to farmers,
							storehouse renters, laborers, and consumers.
						</p>{" "}
						<p className="text-center text-lime-200">
							2. To use Laangol, you must be at least 18 years of age or older.
							If you are under 18, you may only use the platform under the
							supervision of a parent or legal guardian who agrees to be bound
							by these terms.
						</p>
						<p className="text-center text-lime-200">
							3. You are responsible for maintaining the confidentiality of your
							account and password. Laangol reserves the right to terminate
							accounts that violate these terms.
						</p>
						<p className="text-center text-lime-200">
							4. Laangol reserves the right to suspend or terminate your access
							to the platform at any time, with or without notice, for violating
							these terms.
						</p>
						<p className="text-center text-lime-200">
							5. We may modify these terms at any time. Continued use of Laangol
							following such modifications constitutes your acceptance of the
							updated terms.
						</p>
						{/* Added message */}
					</div>
					<Button text="OK" onClick={onClose} />
				</div>
			</div>
		</div>
	);
};

export default TermsAndCondition;

import React from "react";
import Button from "../Button/Button";

interface PopupProps {
	isOpen: boolean;
	onClose: () => void;
}

const PrivacyPolicy: React.FC<PopupProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-lime-100 bg-opacity-10">
			<div className="bg-white p-6 rounded-lg shadow-xl">
				<div className="content flex flex-col items-center space-y-5">
					<div className="text flex flex-col items-start space-y-2">
						<h2 className="text-3xl font-semibold text-center text-lime-200">
							Privacy Policy
						</h2>
						<p className="text-center ">
							1. Laangol is committed to protecting your privacy. We collect and
							use your personal information only for the purpose of providing
							you with our services.
						</p>{" "}
						<p className="text-center text-lime-200">
							2. Laangol uses cookies to enhance your experience. Cookies are
							small files stored on your device that help us recognize repeat
							users and optimize our services.
						</p>
						<p className="text-center text-lime-200">
							3. All content, including but not limited to the platform design,
							graphics, logo, text, and software, is the intellectual property
							of Laangol unless otherwise stated. You may not use, copy, or
							distribute this content without express written permission from
							Laangol.
						</p>
						<p className="text-center text-lime-200">
							4. Our platform may contain links to third-party websites or
							services. We are not responsible for the content, privacy
							policies, or practices of any third-party sites.
						</p>
						<p className="text-center text-lime-200">
							5. Laangol will not be liable for any direct, indirect,
							incidental, or consequential damages arising from your use of the
							platform, including but not limited to the loss of data, profits,
							or business opportunities.
						</p>
						<p className="text-lime-200">
							6. These policies are governed by the laws of Bangladesh, and any
							disputes arising from these terms shall be subject to the
							exclusive jurisdiction of the courts in Bangladesh.
						</p>
						{/* Added message */}
					</div>
					<Button text="OK" onClick={onClose} />
				</div>
			</div>
		</div>
	);
};

export default PrivacyPolicy;

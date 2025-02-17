import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const LegalPolicies = () => {
	return (
		<>
			<header>
				<Navbar />
			</header>
			<div className="term_and_condition bg-lime-100 bg-opacity-10">
				<div className="header text-lime-200 text-5xl font-semibold">
					<h1>Terms and Conditions</h1>
				</div>
				<div className="terms_content">
					<div className=" min-h-screen flex justify-center items-center">
						<div className="text-lime-200 w-full p-6 rounded-lg space-y-8">
							<Section
								title="1. Data Collection and Privacy"
								content={[
									"Laangol is committed to protecting your privacy. We collect and use your personal information only for the purpose of providing you with our services.",
									{
										subtitle: "Personal Data Collected:",
										list: [
											"Name, email, phone number, and other identifying information when you create an account.",
											"Information about the products you sell, storehouse rentals, labor services, and queries made through the chatbot.",
										],
									},
									{
										subtitle: "Use of Data:",
										list: [
											"To provide access to the marketplace, storehouse rental, and labor services.",
											"To improve user experience through analytics and AI-powered chatbot responses.",
											"To process transactions securely.",
										],
									},
									"Data Security: We employ industry-standard encryption and security measures to protect your personal data from unauthorized access or disclosure.",
								]}
							/>

							<Section
								title="2. Cookies and Tracking"
								content={[
									"Laangol uses cookies to enhance your experience. Cookies are small files stored on your device that help us recognize repeat users and optimize our services.",
									{
										subtitle: "Types of Cookies Used:",
										list: [
											"Essential cookies for site functionality.",
											"Analytics cookies to track and improve platform performance.",
										],
									},
									"Cookie Settings: You can control or delete cookies through your browser settings, but doing so may affect your ability to use certain features of the platform.",
								]}
							/>

							<Section
								title="3. Intellectual Property"
								content={[
									"All content, including but not limited to the platform design, graphics, logo, text, and software, is the intellectual property of Laangol unless otherwise stated. You may not use, copy, or distribute this content without express written permission from Laangol.",
								]}
							/>

							{/* Add more sections similarly */}

							<Section
								title="8. Contact Us"
								content={[
									"If you have any questions or concerns regarding this legal policy, please contact us at [legal@laangol.com].",
								]}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

type SectionProps = {
	title: string;
	content: (string | { subtitle?: string; list?: string[] })[];
};

const Section: React.FC<SectionProps> = ({ title, content }) => {
	return (
		<div className="space-y-4">
			<h2 className="text-3xl font-semibold text-lime-100">{title}</h2>
			{content.map((paragraph, index) =>
				typeof paragraph === "string" ? (
					<p key={index}>{paragraph}</p>
				) : (
					<div key={index} className="ml-4 space-y-2">
						{paragraph.subtitle && (
							<h3 className="text-2xl font-medium text-lime-200">
								{paragraph.subtitle}
							</h3>
						)}
						{paragraph.list && (
							<ul className="list-disc ml-5">
								{paragraph.list.map((item, idx) => (
									<li key={idx}>{item}</li>
								))}
							</ul>
						)}
					</div>
				)
			)}
		</div>
	);
};

export default LegalPolicies;

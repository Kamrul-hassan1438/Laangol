import React from "react";
import Navbar from "../../components/Navbar/Navbar";

export const T_and_C = () => {
	return (
		<>
			<header>
				<Navbar />
			</header>
			<div className="t_and_c bg-lime-100 bg-opacity-10">
				<div className="header text-5xl font-semibold text-lime-200">
					<h1>Terms and Condition</h1>
				</div>
				<div className="content mt-10 pl-5">
					<div className=" min-h-screen flex justify-center items-center">
						<div className="w-full rounded-lg shadow-md space-y-8">
							<Section
								title="Introduction"
								content={[
									"Welcome to Laangol! By using our platform, you agree to comply with and be bound by the following terms and conditions. Please review the terms carefully, and if you disagree with any part, you may discontinue using the platform.",
								]}
							/>

							<Section
								title="1. Acceptance of Terms"
								content={[
									"By accessing and using Laangol, you agree to these terms and conditions, all applicable laws, and regulations. These terms apply to all users, including but not limited to farmers, storehouse renters, laborers, and consumers.",
								]}
							/>

							<Section
								title="2. Eligibility"
								content={[
									"To use Laangol, you must be at least 18 years of age or older. If you are under 18, you may only use the platform under the supervision of a parent or legal guardian who agrees to be bound by these terms.",
								]}
							/>

							<Section
								title="3. Services"
								content={[
									{
										subtitle: "",
										list: [
											"Users can sell agricultural products.",
											"Farmers can rent out their storehouses to others.",
											"Laborers can offer services, and users can hire labor for specific tasks.",
											"An AI-powered chatbot assists with agricultural inquiries.",
										],
									},
								]}
							/>

							<Section
								title="4. User Accounts"
								content={[
									"You are responsible for maintaining the confidentiality of your account and password. Laangol reserves the right to terminate accounts that violate these terms.",
								]}
							/>

							<Section
								title="5. User Conduct"
								content={[
									{
										subtitle: "Users agree not to:",
										list: [
											"Use the platform for illegal purposes or unauthorized activities.",
											"Post inaccurate, misleading, or inappropriate content.",
											"Violate any local, national, or international laws.",
											"Interfere with other users' enjoyment of the platform.",
										],
									},
								]}
							/>

							<Section
								title="6. Payments and Fees"
								content={[
									{
										subtitle: "",
										list: [
											"Payments for services or products are to be made through the platform's secure payment gateway.",
											"Fees for storehouse rentals and labor services are determined by the users and are subject to applicable taxes.",
											"Laangol reserves the right to adjust transaction fees as necessary, which will be communicated in advance.",
										],
									},
								]}
							/>

							<Section
								title="7. Limitation of Liability"
								content={[
									"Laangol is not responsible for:",
									{
										subtitle: "",
										list: [
											"The accuracy, quality, and legality of the products, storehouses, or labor services listed on the platform.",
											"Any damages or losses arising from the use of the platform.",
										],
									},
								]}
							/>

							<Section
								title="8. Termination of Use"
								content={[
									"Laangol reserves the right to suspend or terminate your access to the platform at any time, with or without notice, for violating these terms.",
								]}
							/>

							<Section
								title="9. Changes to Terms"
								content={[
									"We may modify these terms at any time. Continued use of Laangol following such modifications constitutes your acceptance of the updated terms.",
								]}
							/>

							<Section
								title="10. Contact Us"
								content={[
									"For any queries or issues regarding these terms, please contact us at [support@laangol.com].",
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
					<p key={index} className="ml-10 text-lime-200">
						{paragraph}
					</p>
				) : (
					<div key={index} className="ml-5 space-y-2 text-lime-100">
						{paragraph.subtitle && (
							<h3 className="ml-5 text-2xl font-medium text-lime-200">
								{paragraph.subtitle}
							</h3>
						)}
						{paragraph.list && (
							<ul className="list-disc ml-10 text-lime-200">
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
export default T_and_C;

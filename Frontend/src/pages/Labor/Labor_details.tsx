import Button from "../../components/Button/Button";
import user from "../../assets/user.png";
import Short_card_2 from "../../components/Dynamic_card/Labor_and_Store";
import { Link } from "react-router-dom";

const Labor_details = () => {
	return (
		<>
			<div className="labor_details container ">
				<div className="heading text-2xl sm:text-3xl font-semibold text-lime-900">
					<h1>Labor Management</h1>
				</div>

				<div className="content mt-11 flex flex-col space-y-8 text-lime-900">
					<div className="labor_details">
						<div className="labor_title flex items-center justify-center text-xl sm:text-2xl">
							<h1 className="bg-lime-800 px-10 sm:px-20 py-2 rounded-md">
								Labor
							</h1>
						</div>

						<div className="labor flex flex-col md:flex-row items-center justify-between space-y-5 md:space-y-0">
							<div className="labor_info w-full flex flex-col md:flex-row items-start space-y-5 md:space-y-0 md:space-x-5">
								{/* Profile Image */}
								<div className="image_section">
									<img
										src={user}
										alt="User"
										className="w-full sm:w-60 md:w-80 bg-lime-200 p-2 rounded-lg border border-lime-500"
									/>
								</div>

								{/* Profile Info */}
								<div className="info_section flex flex-col space-y-2 items-start">
									<p className="text-lg sm:text-xl md:text-2xl">
										Dipto Mahdud Sultan
									</p>

									{/* Taglines */}
									<div className="taglines flex flex-col md:flex-row items-center justify-center md:justify-normal space-y-2 md:space-y-0 md:space-x-3">
										<div className="tag px-2 py-1 bg-lime-100 rounded-md border border-lime-800 text-sm">
											<p>3+ years Experience</p>
										</div>
										<div className="tag px-2 py-1 bg-lime-100 rounded-md border border-lime-800 text-sm">
											<p>Lalpur Upazila, Pabna</p>
										</div>
										<div className="tag px-2 py-1 bg-lime-100 rounded-md border border-lime-800 text-sm">
											<p>+8801712345678</p>
										</div>
									</div>

									<div className="bottom_layer flex flex-col space-y-8">
										<p className="w-full md:w-fit text-sm md:text-base">
											A 35-year-old male agricultural worker, has 3+ years of
											experience in crop planting, harvesting, irrigation
											management, and pest control. Employed full-time since
											March 1, 2021, under supervisor Jane Smith, he handles
											planting, weeding, harvesting, and maintaining irrigation
											systems. He operates and maintains farm machinery and
											holds certifications in pesticide application and OSHA
											safety training.
										</p>

										<div className="connection flex flex-col md:flex-row items-center w-full space-y-5 md:space-y-0 md:space-x-7">
											<Button text="250\Hr BDT"></Button>
											<Button text="Chat with labor" />
											<Button text="Contact Area Consultant" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="more_details_section">
						<div className="more_details">
							<h1>Find more Labor</h1>
							<div className="more_details_card flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
								<Link to="labor_details">
									<Short_card_2
										imageSrc={user}
										name="Dipto Mahdud Sultan"
										rate="250\Hr BDT"
									/>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Labor_details;

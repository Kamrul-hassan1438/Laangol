import Navbar from "../components/Navbar/Navbar";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import Dropdown from "../components/Dropdown/FAQ";

import BannerImg from "../assets/banner.png";
import Leaf from "../assets/leaf.png";
import arrow from "../assets/right-arrow.png";
import Govt from "../assets/govt.png";
import Wfp from "../assets/wfp.png";
import Usaid from "../assets/usaid.png";
import Brac from "../assets/brac.png";
import Customer from "../assets/customer.jpg";
import Farmer from "../assets/farmer.jpg";
import Investor from "../assets/admin.jpg";
import Logo from "../assets/laangol.png";
import rightArow from "../assets/rightArrow.svg";
import { Link } from "react-router-dom";

const Landing_page = () => {
	return (
		<>
			<nav>
				<Navbar />
			</nav>
			<div className="landing_page py-10 bg-lime-50 bg-my-img">
				<header>
					<div className="banner_content ">
						<div className="none mx-12 flex items-center justify-between py-12">
							<div className="banner_text flex flex-col items-baseline leading-none text-nowrap">
								<h1 className="text-xl font-bold text-lime-100 z-30">
									Make your harvesting
								</h1>
								<h1 className="text-xl font-bold text-lime-200">hassle free</h1>
								<p className="mt-5 font-normal text-lg text-lime-200">
									Struggling with Irrigation, labor force & finance? Laangol got
									you!
								</p>
								<p className="mt-2 font-normal text-lg text-lime-800">
									With an easy to use application, solve your own problem!
								</p>
								<Link to="/login">
									<button className="mt-5 py-3 pr-5 pl-3 bg-lime-100 rounded-3xl flex items-center gap-x-4 transition duration-300 ease-in-out transform hover:bg-lime-200 hover:text-white  ">
										<p>Get an advisor for free </p>
										<img src={arrow} alt="" className=" w-4 h-4 " />
									</button>
								</Link>
							</div>
							<div className="banner_images flex items-end relative justify-end">
								<img src={Leaf} alt="" className="" />
								<img src={BannerImg} alt="" className="relative right-7 z-10" />
							</div>
						</div>
					</div>
				</header>

				<div className="branding_content mt-10  bg-lime-50">
					<div className="none flex flex-col gap-y-12 items-center justify-center">
						<div className="branding_heading mt-9">
							<h1 className="text-5xl font-bold text-lime-100">
								Making your success with our collaborators
							</h1>
						</div>
						<div className="branding_images my-12 flex gap-x-36 items-center">
							<img src={Govt} alt="" className="h-28" />
							<img src={Wfp} alt="" className="h-28" />
							<img src={Usaid} alt="" className="h-20" />
							<img src={Brac} alt="" className="h-20" />
						</div>
					</div>
				</div>
				<div className="accessability_content">
					<div className="none my-10">
						<div className="headings flex flex-col gap-y-5 items-center justify-center leading-none">
							<div className="main_heading flex flex-col items-center">
								<h1 className="text-xl font-bold text-lime-100">
									Accessibility
								</h1>
								<h2 className="text-7xl font-bold text-lime-200">
									for everyone
								</h2>
							</div>
							<div className="sub_heading flex flex-col items-center text-lg text-lime-200 leading-8">
								<p>
									Struggling with Irrigation, labor force & finance? Laangol got
									you!
								</p>
								<p>With an easy to use application, solve your own problem! </p>
							</div>
						</div>
						<div className="card_section my-20 flex items-center gap-x-10 justify-center">
							<Card
								imageSrc={Customer}
								title="Consumer"
								description="Easily rent their storagehouse and get themselves hired for labor. Creates a job opportunity for the unemployed"
							/>
							<Card
								imageSrc={Farmer}
								title="Farmer"
								description="Easily hire labor and storage alongside having a fair marketprice. They dont have to depend on the middleman"
							/>
							<Card
								imageSrc={Investor}
								title="Area Consultant"
								description="Can manage all the farmers and consumers. "
							/>
						</div>
					</div>
				</div>

				<div className="faq_content" id="faq">
					<div className="my-36">
						<div className="heading">
							<h1 className="flex items-center justify-center text-xl font-bold text-lime-200">
								Frequently Asked Questions
							</h1>
						</div>
						<div className="mt-20 content_section flex flex-col gap-y-5 items-center justify-center text-lime-200 text-2xl font-medium">
							<Dropdown title="What is Laangol">
								<p className="text-base font-normal">
									Laangol is platform for different kind of users such for the
									farmers, for the consumer and last but not the least the
									consumer. Laangol helps one to receive crop recommendations
									based on regional environmental conditions, hire labor to work
									on their land for increased productivity etc.
								</p>
							</Dropdown>
							<Dropdown title="How Laangol can benefit me? ">
								<p className="text-base font-normal">
									Laangol is platform for different kind of users such for the
									farmers, for the consumer and last but not the least the
									consumer. Laangol helps one to receive crop recommendations
									based on regional environmental conditions, hire labor to work
									on their land for increased productivity etc.
								</p>
							</Dropdown>
							<Dropdown title="Is Laangol free for all time? ">
								<p className="text-base font-normal">
									Laangol is platform for different kind of users such for the
									farmers, for the consumer and last but not the least the
									consumer. Laangol helps one to receive crop recommendations
									based on regional environmental conditions, hire labor to work
									on their land for increased productivity etc.
								</p>
							</Dropdown>
							<Dropdown title="Does Laangol have any hidden charges? ">
								<p className="text-base font-normal">
									Laangol is platform for different kind of users such for the
									farmers, for the consumer and last but not the least the
									consumer. Laangol helps one to receive crop recommendations
									based on regional environmental conditions, hire labor to work
									on their land for increased productivity etc.
								</p>
							</Dropdown>
						</div>
					</div>
				</div>
				<div className="contact_content">
					<div className="content mx-28 pb-32 bg-lime-50 rounded-2xl">
						<div className="contact_heading pt-12 pl-12">
							<h1 className="text-6xl text-lime-100 font-bold">Not sure? </h1>
							<h2 className="text-2xl text-lime-200 font-bold">
								How about you give us your number and we will contact you{" "}
							</h2>
						</div>
						<div className="contact_form mt-10 ml-12 p-2 max-w-fit bg-white rounded-2xl">
							<form action="" className="">
								<input
									type="text"
									placeholder="Enter your number"
									className="py-5 pl-8 w-80"
								/>
								<button className="px-1 py-4 bg-lime-100 rounded-xl text-lime-200 font-semibold transition duration-300 ease-in-out transform hover:bg-lime-200 hover:text-lime-50">
									We'll Contact you
								</button>
							</form>
						</div>
					</div>
				</div>
				<footer>
					<div className="footer_content mt-36 bg-white">
						<div className="pl-28 pt-11 flex items-center justify-start gap-x-80">
							<div className="logo_part">
								<img src={Logo} alt="" className="w-72" />
							</div>
							<div className="content_part flex justify-center gap-x-32">
								<div className="links_part flex flex-col gap-y-6">
									<div className="headings">
										<h1 className="headings text-sm font-medium leading-4 text-black">
											LINKS
										</h1>
									</div>
									<div className="links flex flex-col gap-y-2 text-base font-semibold text-lime-200 transition duration-300 ease-in-out transform ">
										<a
											href=""
											className="transition duration-300 ease-in-out transform hover:text-lime-100"
										>
											Features
										</a>

										<a
											href=""
											className="transition duration-300 ease-in-out transform hover:text-lime-100"
										>
											FAQ
										</a>
										<a
											href=""
											className="transition duration-300 ease-in-out transform hover:text-lime-100"
										>
											About us
										</a>
									</div>
								</div>
								<div className="external_part flex flex-col gap-y-6">
									<div className="headings text-sm font-medium leading-4  text-black">
										<h1>EXTERNAL</h1>
									</div>
									<div className="external flex flex-col gap-y-2 text-base font-semibold text-lime-200">
										<a
											href=""
											className="transition duration-300 ease-in-out transform hover:text-lime-100"
										>
											Terms and Conditions
										</a>
										<a
											href=""
											className="transition duration-300 ease-in-out transform hover:text-lime-100"
										>
											Legal Policies
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="copyright mt-14 pl-28 pb-40 text-base text-lime-200">
							<p>Copyright © 2024 Team SAD gpt. All rights reserved.</p>
						</div>
					</div>
				</footer>
			</div>
		</>
	);
};

export default Landing_page;

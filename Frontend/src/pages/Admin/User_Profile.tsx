import Button from "../../components/Button/Button";
import user from "../../assets/user.png";
import crops from "../../assets/crop.png";

const User_Profile = () => {
	return (
		<>
			<div className="heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-lime-900 text-start">
				<h1>Marketplace</h1>
			</div>
			<div className="product_content mt-8 md:mt-10 lg:mt-12">
				<h2 className="p-2 rounded-md w-max bg-lime-800 text-lime-900 text-xl md:text-2xl lg:text-3xl font-normal">
					Product Page
				</h2>
				<div className="product_description mt-5 md:mt-7 flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-6">
					<div className="product_image w-full lg:w-1/2 h-64 md:h-80 bg-lime-300 flex items-center justify-center">
						<img
							src={user}
							alt="Product"
							className="object-contain w-full h-full"
						/>
					</div>
					<div className="product_details flex flex-col space-y-4 lg:w-1/2">
						<h3 className="title text-2xl md:text-3xl font-semibold text-lime-900">
							Tomato
						</h3>

						<div className="category flex flex-wrap items-start space-x-2">
							<p className="p-1 bg-lime-200 border border-lime-400 rounded-md text-lime-900">
								farmer
							</p>
							<p className="p-1 bg-lime-200 border border-lime-400 rounded-md text-lime-900">
								Consumer
							</p>
						</div>
						<p className="description text-base md:text-lg text-lime-900">
							The tomato is made using artificial intelligence method. It is
							enriched with all the vitamins you can get. It is completely
							fresh. For more detailed process of vegetation feel free to
							contact us.
						</p>

						<div className="btn_panel flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
							<Button text="Ban" />
							<Button text="Delete User" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default User_Profile;

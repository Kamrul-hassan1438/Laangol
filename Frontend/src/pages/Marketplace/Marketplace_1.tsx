import ShortCard from "../../components/Dynamic_card/Feature_card";
import accessories from "../../assets/accessories.png";
import vegetables from "../../assets/vegetables.png";
import fertilizers from "../../assets/fertilizers.png";
import Marketplace_top from "../../components/Marketplace_top/Marketplace_top";
import ProductCard from "../../components/Dynamic_card/Product_card";
import { Link } from "react-router-dom";

const Marketplace_1 = () => {
	return (
		<>
			<Marketplace_top />

			{/* Categories Section */}
			<div className="categories mt-16 flex items-center justify-center space-x-16">
				<Link to="marketplace2/Vegetables">
					<ShortCard imageSrc={vegetables} heading="Vegetables" />
				</Link>
				<Link to="marketplace2/Fertilizers">
					<ShortCard imageSrc={fertilizers} heading="Fertilizers" />
				</Link>
				<Link to="marketplace2/Accessories">
					<ShortCard imageSrc={accessories} heading="Accessories" />
				</Link>
			</div>

			{/* Discount Banner */}
			<div className="discount_banner my-16 py-5 bg-lime-50 flex items-center justify-center">
				<p className="p-4 w-max bg-lime-100 text-3xl tracking-wider rounded-md text-lime-200">
					On sale for 40%
				</p>
			</div>

			{/* Product Items */}
			<div className="product_items flex items-center justify-center space-x-7">
				<Link to="product_info">
					<ProductCard
						imageSrc={accessories}
						productName="Accessories"
						sellerName="Seller Name"
						price={100}
					/>
				</Link>
			</div>
		</>
	);
};

export default Marketplace_1;

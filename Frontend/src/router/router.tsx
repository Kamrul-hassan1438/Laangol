import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Marketplace_1 from "../pages/Marketplace/Marketplace_1";
import Marketplace_2 from "../pages/Marketplace/Marketplace_2";
import Product_description from "../pages/Marketplace/Product_description";
import Adding_items from "../pages/Marketplace/Adding_items";
import Inventory from "../pages/Marketplace/Inventory";
import Crop_maintainance from "../pages/Crop_Maintainance/Crop_maintainance";
import Labor_Main from "../pages/Labor/Labor_Main";
import Store_main from "../pages/StoreHouse/Store_Main";
import User from "../pages/User/User";
import Labor_list from "../pages/Labor/Labor_list";
import Labor_profile from "../pages/Labor/Labor_profile";
import StoreList from "../pages/StoreHouse/Store_house_list"; // Import StoreList
import StoreDetails from "../pages/StoreHouse/Store_details"; // Import StoreDetails
import Store_rental from "../pages/StoreHouse/Store_rental";
import Login_page from "../pages/Authentication/Login_page";
import Chatbot from "../pages/Chatbot/Chatbot";
import Landing_page from "../pages/Landing_page";
import Signup_page from "../pages/Authentication/Signup_page";
import Admin_Main from "../pages/Admin/Admin_Main";
import User_Management from "../pages/Admin/User_Management";
import Admin_dashboard from "../pages/Admin/Admin_dashboard";
import Product_Management from "../pages/Admin/Product_Management";
import User_Profile from "../pages/Admin/User_Profile";
import Admin_Profile from "../pages/Admin/Admin_Profile";
import Cart from "../pages/Marketplace/Cart";
import Labor_details from "../pages/Labor/Labor_details";
import Requests_labor from "../pages/Labor/Requests_labor";
import Requests_storehouse from "../pages/StoreHouse/Requests_storehouse";
import Chat from "../pages/Chat/Chat";
import TermsAndCondition from "../components/Popup/TermsAndCondition";
import T_and_C from "../pages/OtherPages/T_and_C";
import LegalPolicies from "../pages/OtherPages/Legal_Policies";

const router = createBrowserRouter([
	{
		path: "/", // Default route is login
		element: <Landing_page />,
	},
	{
		path: "/signup",
		element: <Signup_page />,
	},
	{
		path: "/login",
		element: <Login_page />,
	},
	// User Dashboard Routes
	{
		path: "/dashboard",
		element: <Dashboard />,
		children: [
			{
				path: "marketplace",
				element: <Marketplace_1 />,
			},
			{
				path: "marketplace/marketplace2/:category",
				element: <Marketplace_2 />,
			},
			{
				path: "marketplace/marketplace2/product_details/:id",
				element: <Product_description />,
			},
			{
				path: "marketplace/add_items",
				element: <Adding_items />,
			},
			{
				path: "marketplace/add_items/:productId",
				element: <Adding_items />,
			},
			{
				path: "marketplace/add_items/inventory",
				element: <Inventory />,
			},
			{
				path: "crop_maintainance",
				element: <Crop_maintainance />,
			},
			{
				path: "labor",
				element: <Labor_Main />,
			},
			{
				path: "labor/labor_list",
				element: <Labor_list />,
			},
			{
				path: "labor/labor_requests",
				element: <Requests_labor />,
			},
			{
				path: "labor/labor_list/labor_details",
				element: <Labor_details />,
			},
			{
				path: "labor/labor_profile",
				element: <Labor_profile />,
			},
			{
				path: "storehouse",
				element: <Store_main />,
			},
			{
				path: "storehouse/store_requests",
				element: <Requests_storehouse />,
			},
			{
				path: "storehouse/store_list",
				element: <StoreList />, // Use StoreList for store list
			},
			{
				path: "storehouse/store_list/storehouse_details/:storehouseId", // Use :storehouseId as a dynamic route parameter
				element: <StoreDetails />, // Use StoreDetails for storehouse details
			},

			{
				path: "storehouse/store_rental",
				element: <Store_rental />,
			},
			{
				path: "agroaegis",
				element: <Chatbot />,
			},
			{
				path: "cart",
				element: <Cart />,
			},
			{
				path: "user",
				element: <User />,
			},
			{
				path: "chat",
				element: <Chat />,
			},
		],
	},
	// Admin Panel Routes
	{
		path: "/admin",
		element: <Admin_dashboard />,
		children: [
			{
				index: true,
				element: <Admin_Main />,
			},
			{
				path: "admin_home",
				element: <Admin_Main />,
			},
			{
				path: "user_management",
				element: <User_Management />,
			},
			{
				path: "user_management/user_profile",
				element: <User_Profile />,
			},
			{
				path: "product_management",
				element: <Product_Management />,
			},
			{
				path: "admin_profile",
				element: <Admin_Profile />,
			},
		],
	},
	{
		path: "/terms_and_conditions",
		element: <T_and_C />,
	},
	{
		path: "/privacy_policy",
		element: <LegalPolicies />,
	},
]);

export default router;

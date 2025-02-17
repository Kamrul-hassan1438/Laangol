import { useEffect, useState } from "react"; // Import useEffect and useState
import { Link, Outlet, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Button from "../../components/Button/Button";
import userManagement from "../../assets/userManagement.png";
import productManagement from "../../assets/productManagement.png";

const Admin_Main = () => {
    const [isAdmin, setIsAdmin] = useState(false); 
    const [errorMessage, setErrorMessage] = useState(""); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem("token"); 
        
        fetch("http://127.0.0.1:8004/admin-only/", {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`, 
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to verify admin status");
                }
                return response.json();
            })
            .then((data) => {
                if (data.message === "You are an Admin with a valid special ID.") {
                    setIsAdmin(true); 
                } else {
                    setErrorMessage("Access denied: You are not an admin."); 
                    navigate("/"); 
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setErrorMessage("An error occurred while verifying admin status."); 
                navigate("/"); 
            });
    }, [navigate]); // Add navigate as a dependency to useEffect

    return (
        <div className="admin_main text-lime-900 min-h-screen flex flex-col">
            <div className="top_section flex items-center justify-between">
                <h1 className="heading text-3xl md:text-4xl text-lime-200 font-semibold text-left">
                    Admin Control Center
                </h1>
            </div>

            <div className="content flex-grow flex items-center justify-center">
                {isAdmin ? ( // Check if user is admin
                    <div className="links flex flex-col items-center space-y-5">
                        <div className="box_container flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16">
                            <Link
                                to="user_management"
                                className="box bg-lime-100 bg-opacity-10 w-full md:w-auto py-16 px-12 md:px-20 border border-lime-100 rounded-lg flex flex-col items-center justify-center space-y-4 text-xl md:text-2xl text-lime-200 transition duration-300 ease-in-out transform hover:bg-lime-100 hover:scale-105"
                            >
                                <img src={userManagement} alt="User Management" />
                                <p>User Management</p>
                            </Link>
                            <Link
                                to="product_management"
                                className="box bg-lime-100 bg-opacity-10 w-full md:w-auto py-16 px-12 md:px-20 border border-lime-100 rounded-lg flex flex-col items-center justify-center space-y-4 text-xl md:text-2xl text-lime-200 transition duration-300 ease-in-out transform hover:bg-lime-100 hover:scale-105"
                            >
                                <img src={productManagement} alt="Product Management" />
                                <p>Product Management</p>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-500">{errorMessage}</p> // Display error message if not admin
                )}
            </div>

            {/* Render the Outlet for nested routes */}
            <Outlet />
        </div>
    );
};

export default Admin_Main;

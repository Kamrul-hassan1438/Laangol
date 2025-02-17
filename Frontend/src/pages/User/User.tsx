import React, { useState, useEffect } from "react";
import userPlaceholder from "../../assets/user.png";
import editIcon from "../../assets/edit.png";
import Button from "../../components/Button/Button";
import Input_text from "../../components/Input_Text/Input_text";
import RadioButton from "../../components/Button/RadioButton";
import Dropdown from "../../components/Dropdown/DropDownTwo";
import axios from "axios";

const User = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    region_name: "",
    user_type: "",
  });
  
  const [userImage, setUserImage] = useState(userPlaceholder);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/user-info/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        
        const userData = response.data;
        setUserInfo({
          name: userData.name,
          email: userData.email,
          phone: userData.number,
          region_name: userData.region_name,
          user_type: userData.type,
          
        });
        console.log("HHello"+userInfo.region_name);
        console.log("Hlllllo"+userInfo.email);
        setUserImage(userData.profile_image_url || userPlaceholder);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  // Handle input changes (for name, email, phone)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Handle radio button change
  const handleRadioChange = (value: string) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      user_type: value,
    }));
  };

  // Handle dropdown (Region selection)
  const handleCategoryChange = (selectedValue: string) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      region_name: selectedValue,
    }));
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = URL.createObjectURL(e.target.files[0]);
      setUserImage(selectedImage);
      setImageFile(e.target.files[0]); // Store the selected file
    }
  };

  const categoryOptions = [
    { value: "1", label: "Dhaka" },
    { value: "2", label: "Chittagong" },
    { value: "3", label: "Khauli" },
    { value: "5", label: "Rajshahi" },
    { value: "4", label: "Sylhet" },
    { value: "6", label: "Barishal" },
    { value: "8", label: "Mymensingh" },
    { value: "7", label: "Rangpur" },

];


  const handleUpdateUser = async () => {
    const formData = new FormData();
    formData.append("name", userInfo.name);
    formData.append("phone_number", userInfo.phone);
    formData.append("user_type", userInfo.user_type);
    formData.append(
      "region_id",
      categoryOptions.find(option => option.label === userInfo.region_name)?.value || ""
  );
  
    
    if (imageFile) {
      formData.append("profile_image", imageFile); 
      localStorage.setItem("image", formData.get("profile_image") as string);
    } 

    try {
      const response = await axios.put("http://127.0.0.1:8000/update-user/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("User updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="user_profile w-full">
      <div className="heading text-3xl font-semibold text-lime-900">
        <h1>User Profile</h1>
      </div>
      <div className="content mt-9 flex flex-col space-y-11">
        <div className="top_info px-2 flex items-center justify-between">
          <div className="image_section flex items-end">
            <img
              src={userImage}
              alt="User"
              className="w-32 bg-lime-200 p-2 rounded-full border border-lime-500"
            />
            <div className="relative">
              <img
                src={editIcon}
                alt="Edit"
                className="w-8 cursor-pointer"
                onClick={() => document.getElementById("fileInput")?.click()} // Trigger file input
              />
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          <div className="button_section">
            <Button text="Update profile" onClick={handleUpdateUser} /> {/* Attach click handler */}
          </div>
        </div>

        <div className="bottom_info">
          <div className="user_info">
            <Input_text
              label="Name"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              readOnly={false} // Change to false to allow editing
            />
            <Input_text
              label="Email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              readOnly={true} // Keep as read-only if necessary
            />
            <Input_text
              label="Phone"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
            />

            <div className="type_selection text-lime-200 flex items-center space-x-5">
              <p>Select your Type: </p>
              <div className="radios flex items-center space-x-4">
                <RadioButton
                  label="Farmer"
                  name="user_type"
                  value="FARMER"
                  checked={userInfo.user_type === "FARMER"}
                  onChange={handleRadioChange}
                />
                <RadioButton
                  label="Consumer"
                  name="user_type"
                  value="CONSUMER"
                  checked={userInfo.user_type === "CONSUMER"}
                  onChange={handleRadioChange}
                />
              </div>
            </div>

            <Dropdown
              label="Select Region"
              options={categoryOptions} 
              value={userInfo.region_name}
              onChange={handleCategoryChange}
              placeholder="Select a region"
              className="min-w-fit text-base text-lime-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

import React, { useEffect, useState } from "react";
import sending from "../../assets/sending.png";
import { io } from "socket.io-client";
import axios from "axios";

// User interface
interface User {
  id: number;
  name: string;
  message: string;
  time: string;
  image: string | null;
}

// Connect to the socket server
const socket = io("http://localhost:3000"); // Replace with your server URL

const Chat: React.FC = () => {
  const token = localStorage.getItem("token"); // Replace this with the actual token retrieval method
  const loggedInUserId = localStorage.getItem("user_id"); 
  console.log("login :"+loggedInUserId);

  const [usersData, setUsersData] = useState<User[]>([]); // Store users from API
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>(
    []
  );

  useEffect(() => {
    // Fetch connected users from the API on component load
    const fetchConversations = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8008/conversations-list/", {
          headers: {
            Authorization: `Token ${token}`, // Send token for authentication
          },
        });

        // Format the response to match the expected user data structure
        const formattedUsers: User[] = response.data.map((conversation: any) => ({
          id: conversation.user_id,
          name: conversation.name,
          message: "", // Default message
          time: "", // You can update this based on actual chat data
          image: conversation.image, // Use avatar from API response
        }));

        setUsersData(formattedUsers); // Set the user data
        setSelectedUser(formattedUsers[0]); // Select the first user by default
      } catch (error) {
        console.error("Error fetching conversations", error);
      }
    };

    fetchConversations();

    // Socket connection and event listeners
    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("connected", loggedInUserId); // Send user ID to the server
    });

    socket.on("messageReceived", (data: { sender: string; message: string }) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("messageReceived");
    };
  }, [loggedInUserId, token]);

  // User selection function
  const selectUser = (user: User) => {
    setSelectedUser(user);
    setMessages([]); // Clear messages when a new user is selected
  };

  // Sending message function
  const sendMessage = () => {
    if (message.trim() === "" || !selectedUser) return;

    const messageData = {
      myId: loggedInUserId, // Use the actual logged-in user's ID
      userId: selectedUser.id,
      message: message,
    };

    // Emit the sendEvent event to the server
    socket.emit("sendEvent", messageData);

    // Add sent message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "You", message },
    ]);

    // Clear the message input
    setMessage("");
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-[#F5FCE4]">
      {/* User List Section */}
      <div className="w-full md:w-1/4 bg-[#EFF8C6] p-4 border-b md:border-b-0 md:border-r border-[#D7F07C]">
        <h2 className="text-2xl font-bold text-[#8EA604] mb-4">Chat</h2>
        <ul>
          {usersData.map((user) => (
            <li
              key={user.id}
              className={`flex items-center space-x-3 p-3 cursor-pointer rounded-md hover:bg-[#D7F07C] ${
                selectedUser?.id === user.id ? "bg-[#D7F07C]" : ""
              }`}
              onClick={() => selectUser(user)}
            >
              <img
                src={user.image || "default-avatar.jpg"}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-[#4F5D2F]">
                  {user.name}
                </h3>
                <p className="text-sm text-[#5F7A3A] truncate">
                  {user.message}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="w-full md:w-3/4 p-6 flex flex-col justify-between">
        <div>
          {selectedUser && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#4F5D2F]">
                  {selectedUser.name}
                </h2>
              </div>
              <div className="border border-[#D7F07C] rounded-md p-4 bg-[#F5FCE4]">
                {messages.map((msg, index) => (
                  <p
                    key={index}
                    className={`text-[#4F5D2F] ${
                      msg.sender === "You" ? "font-bold" : ""
                    }`}
                  >
                    {msg.sender}: {msg.message}
                  </p>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Message Input Section */}
        <div className="mt-4">
          <input
            type="text"
            className="w-full border border-lime-100 rounded-md p-3 mb-2 bg-[#F5FCE4] text-lime-200 outline-none"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              onClick={sendMessage}
              className="bg-lime-100 flex items-center text-lime-200 px-4 py-2 rounded-md hover:bg-lime-200 hover:text-white transition-all"
            >
              <p>Send</p>
              <img src={sending} alt="" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

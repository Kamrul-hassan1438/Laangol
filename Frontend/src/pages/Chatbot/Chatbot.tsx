import React, {
	useState,
	useEffect,
	useRef,
	ChangeEvent,
	FormEvent,
} from "react";
import axios from "axios";

interface Message {
	sender: "user" | "bot";
	text: string;
}

const Chatbot: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const chatWindowRef = useRef<HTMLDivElement>(null);


	const handleSend = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	
		if (input.trim() === "") return;
	
		// Add user's message to the messages array
		const newMessages = [...messages, { sender: "user", text: input }];
		setMessages(newMessages);
		setInput("");
	
		try {
			// Make API call to get the bot's response
			const response = await axios.post("http://localhost:5000/api/ask", {
				question: input,
			});
			let botReply = response.data.answer;
	
			// Replace formatting markers with new lines
			botReply = botReply.replace(/(\*\s*\*\*|\*\*\*|\*\*|\*\s\*|\*|\*\*\*\*|\*\s\*\*)/g, "\n\n");
	
			// Add bot's response to messages
			setMessages((prevMessages) => [
				...prevMessages,
				{ sender: "bot", text: botReply },
			]);
	
			// Send the user question and bot reply to the new API
			await axios.post(
				"http://127.0.0.1:8005/chatbot/",
				{
					question: input,
					response: botReply,
				},
				{
					headers: {
						Authorization: `Token ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
				}
			);
		} catch (error) {
			console.error("Error fetching the response or sending data:", error);
			setMessages((prevMessages) => [
				...prevMessages,
				{ sender: "bot", text: "Sorry, I couldn't get a response." },
			]);
		}
	};
	
	
useEffect(() => {
	const fetchChatHistory = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.get("http://127.0.0.1:8005/chat-history/", {
				headers: {
					Authorization: `Token ${token}`,
					"Content-Type": "application/json",
				},
			});

			const chatHistory = response.data.map((chat: any) => [
				{ sender: "user", text: chat.question },
				{ sender: "bot", text: chat.response.replace(/(\*\s*\*\*|\*\*\*|\*\*|\*\s\*|\*|\*\*\*\*|\*\s\*\*)/g, "\n\n") }, // format response
			]).flat();

			setMessages(chatHistory);
		} catch (error) {
			console.error("Error fetching chat history:", error);
		}
	};

	fetchChatHistory();

	// Auto scroll to bottom
	if (chatWindowRef.current) {
		chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
	}
}, []);


	return (
		<div className="newBot h-full flex flex-col justify-between  overflow-hidden">
			<div className="heading text-2xl sm:text-3xl font-semibold text-lime-200 p-4">
				<h1>AgroAegis</h1>
			</div>

			{/* Main content area */}
			<div className="flex-grow flex flex-col w-full overflow-hidden">
				{/* Chat messages container */}
				<div
					ref={chatWindowRef}
					className="flex-grow flex flex-col p-2 sm:p-4 bg-lime-50 space-y-2 sm:space-y-4 overflow-y-auto"
				>
					{messages.map((msg, index) => (
						<div
							key={index}
							className={`flex ${
								msg.sender === "user" ? "justify-end" : "justify-start"
							}`}
						>
							<div
								className={`max-w-[70%] p-2 sm:p-3 rounded-lg ${
									msg.sender === "user"
										? "bg-lime-200 text-right text-lime-50"
										: "bg-lime-100 text-left text-lime-200"
								}`}
							>
								{msg.text}
							</div>
						</div>
					))}
				</div>

				{/* Input and Send button */}
				<form
					onSubmit={handleSend}
					className="flex items-center p-2 sm:p-4 bg-lime-50 border-t border-gray-300"
				>
					<input
						type="text"
						value={input}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setInput(e.target.value)
						}
						placeholder="Type a message..."
						className="flex-grow p-1 sm:p-2 border border-lime-100 bg-lime-100 bg-opacity-10 placeholder:text-lime-200 rounded-md focus:outline-none focus:border-lime-500 text-sm sm:text-base"
					/>
					<button
						type="submit"
						className="ml-2 px-2 sm:px-4 py-1 sm:py-2 bg-lime-100 text-lime-200 rounded-md transition duration-300 ease-in-out transform hover:bg-lime-200 hover:text-lime-50 "
					>
						Send
					</button>
				</form>
			</div>
		</div>
	);
};

export default Chatbot;

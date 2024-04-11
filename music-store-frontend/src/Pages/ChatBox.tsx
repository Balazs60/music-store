import React, { useState } from 'react';

const ChatBox: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    const toggleChatBox = () => {
        setIsOpen(!isOpen);
    };

    const handleCloseChatBox = () => {
        setIsOpen(false);
    };

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const sendMessage = async () => {
        if (message.trim() !== '') {
            try {
                const response = await fetch('/api/chat/send-message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message })
                });

                if (!response.ok) {
                    throw new Error('Failed to send message');
                }

                const responseData = await response.text(); // Assuming the response is a string
                setMessages([...messages, message, responseData]); // Add user message and backend response to messages array
                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
                // Handle error, e.g., show error message to the user
            }
        }
    };

    return (
        <div className="fixed bottom-4 right-4">
            <button 
                className="mt-4  bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                onClick={toggleChatBox}
            >
                Chat
            </button>
            {isOpen && (
                <div className="fixed bottom-28 right-4 w-64 h-80 bg-white p-4 shadow-lg rounded"> {/* Adjusted height here */}
                    <button 
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={handleCloseChatBox}
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" />
                        </svg>
                    </button>
                    <div className="text-lg font-bold mb-2">Chat Box</div>
                    <div className="h-56 overflow-y-auto"> {/* Adjusted height here */}
                        {messages.map((msg, index) => (
                            <div 
                                key={index} 
                                className="bg-blue-200 rounded p-2 mb-2"
                            >
                                {msg}
                            </div>
                        ))}
                    </div>
                    <div className="flex mt-9">
                    <input 
                            type="text" 
                            value={message} 
                            onChange={handleMessageChange} 
                            className="w-5/6 mr-0 border-2 border-gray-300 rounded px-2 py-1 focus:outline-none"
                            placeholder="Type your message..."
                        />
                        <button 
                            className="w-1/6 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={sendMessage}
                        >
                            S
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBox;

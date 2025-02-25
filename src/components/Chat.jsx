"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const Chat = () => {
  const initial_message =
    "Hello! I'm Cypher, your guide to learn data privacy and security. Feel free to ask me anything about the concepts.";
  const [chatOpen, SetChatOpen] = useState(false);
  const [message, SetMessage] = useState("");
  const [chatMessages, SetChatMessages] = useState([
    { role: "assistant", content: initial_message },
  ]);

  const handleChatBox = () => {
    SetChatOpen(!chatOpen);
  };

  const handleMessageChange = (e) => {
    SetMessage(e.target.value);
  };

  const handleChatMessage = async () => {
    if (message.trim() !== "") {
      const userMessage = { role: "user", content: message };
      const updatedMessage = [...chatMessages, userMessage];
      SetChatMessages(updatedMessage);
      SetMessage("");
      try {
        const response = await fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ messages: updatedMessage }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data from server");
        }
        const aiMessage = await response.json();
        SetChatMessages([...updatedMessage, aiMessage]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <motion.div
        className="fixed bottom-0 right-0"
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 5.5, ease: "linear" }}
      >
        <Image
          src={"/cypher-watch.gif"}
          alt="cypher-watch"
          width={150}
          height={150}
          onClick={handleChatBox}
        ></Image>
      </motion.div>
      <motion.div
        className="fixed bottom-0 right-0 bg-white mr-2 w-[25%] h-[50%] shadow-lg rounded-t-lg flex flex-col justify-between"
        initial={{ y: "100%" }} // Starts completely off-screen
        animate={{ y: chatOpen ? 0 : "100%" }} // Slides into view or back down
        transition={{ duration: 1 }} // Smooth animation
      >
        <div className="flex justify-between items-center border-b-2">
          <h2 className="text-lg pl-4 font-bold">Chat</h2>
          <Button
            onClick={handleChatBox}
            className="text-white font-bold bg-red-700"
          >
            Close
          </Button>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          {chatMessages.map((msg, index) =>
            msg.role === "assistant" ? (
              <div
                key={index}
                className="bg-gray-200 text-black p-2 mb-2 rounded shadow-sm"
              >
                {msg.content}
              </div>
            ) : (
              <div
                key={index}
                className="bg-blue-600 text-white p-2 mb-2 rounded shadow-sm"
              >
                {msg.content}
              </div>
            )
          )}
        </div>
        <div className="p-4 border-t flex flex-row">
          <Input
            type="text"
            className="text-black"
            placeholder="Type your message"
            value={message}
            onChange={handleMessageChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleChatMessage();
              }
            }}
          />
          <Button
            className="bg-blue-600 text-white"
            onClick={handleChatMessage}
          >
            Send
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Chat;

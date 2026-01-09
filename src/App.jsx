import { useState } from "react";
import { ChatInput } from "./components/ChatInput";
import { ChatMessages } from "./components/ChatMessages";
import "./App.css";

function App() {
  const [chatMessages, setChatMessages] = useState([
    {
      id: crypto.randomUUID(),
      message: "hello",
      sender: "user",
    },
    {
      id: crypto.randomUUID(),
      message: "Hello! How can I help you?",
      sender: "robot",
    },
  ]);

  return (
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;

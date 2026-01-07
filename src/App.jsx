import { useState, useEffect, useRef } from "react";
import { Chatbot } from "supersimpledev";
import UserProfileImage from "./assets/user.png";
import RobotProfileImage from "./assets/robot.png";
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

function ChatInput({ chatMessages, setChatMessages }) {
  const [textInput, setTextInput] = useState("");

  function handleTextInput(event) {
    setTextInput(event.target.value);
  }

  function handleSendInput() {
    const temp = [
      ...chatMessages,
      {
        id: crypto.randomUUID(),
        message: textInput,
        sender: "user",
      },
    ];

    setChatMessages(temp);

    const response = Chatbot.getResponse(textInput);

    setChatMessages([
      ...temp,
      {
        id: crypto.randomUUID(),
        message: response,
        sender: "robot",
      },
    ]);

    setTextInput("");
  }

  return (
    <div className="chat-input-container">
      <input
        className="input-text"
        type="text"
        value={textInput}
        onChange={handleTextInput}
        placeholder="Send a message to Chatbot"
        size="30"
      />
      <button className="send-button" type="submit" onClick={handleSendInput}>
        Send
      </button>
    </div>
  );
}

function ChatMessage({ message, sender }) {
  return (
    <div className={sender === "user" ? "user-sender" : "robot-sender"}>
      {sender === "robot" && (
        <img className="sender-image" src={RobotProfileImage} />
      )}
      <div className="sender-message">{message}</div>
      {sender === "user" && (
        <img className="sender-image" src={UserProfileImage} />
      )}
    </div>
  );
}

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);
  return (
    <div ref={chatMessagesRef} className="chat-messages-container">
      {chatMessages.map((chatMessage) => (
        <ChatMessage
          message={chatMessage.message}
          sender={chatMessage.sender}
          key={chatMessage.id}
        />
      ))}
    </div>
  );
}

export default App;

import { useState } from "react";
import { Chatbot } from "supersimpledev";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [textInput, setTextInput] = useState("");

  function handleTextInput(event) {
    setTextInput(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSendInput();
    }
  }

  function handleSendInput() {
    if (!textInput.trim()) {
      alert("Please! Enter something...");
      return;
    }

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
        onKeyDown={handleKeyDown}
        placeholder="Send a message to Chatbot"
        size="30"
      />
      <button className="send-button" type="submit" onClick={handleSendInput}>
        Send
      </button>
    </div>
  );
}

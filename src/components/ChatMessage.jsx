import { useState, useEffect } from "react";
import { ThreeDot } from "react-loading-indicators";
import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/robot.png";

export function ChatMessage({ message, sender }) {
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimeUp(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={sender === "user" ? "user-sender" : "robot-sender"}>
      {sender === "robot" && (
        <>
          <img className="sender-image" src={RobotProfileImage} />
          {isTimeUp ? (
            <div className="sender-message">{message}</div>
          ) : (
            <div className="sender-message">
              <ThreeDot color="#198754" size="small" text="" textColor="" />
            </div>
          )}
          ;
        </>
      )}

      {sender === "user" && (
        <>
          <div className="sender-message">{message}</div>
          <img className="sender-image" src={UserProfileImage} />
        </>
      )}
    </div>
  );
}

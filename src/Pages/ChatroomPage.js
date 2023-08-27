import React from "react";
import { useParams } from "react-router-dom";

export default function ChatroomPage({ socket }) {
    const { id } = useParams();
    const [messages, setMessages] = React.useState([]);
    const messageRef = React.useRef();
    const [userId, setUserId] = React.useState("");
    const token = localStorage.getItem("CC_Token");

    const sendMessage = () => {
        if (socket) {
        socket.emit("chatroomMessage", {
            id,
            message: messageRef.current.value,
        });

        messageRef.current.value = "";
        }
    };

    React.useEffect(() => {
        if (token) {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setUserId(payload.id);
        }
        if (socket) {
          socket.on("newMessage", (message) => {
            const newMessages = [...messages, message];
            setMessages(newMessages);
          });
        }
        //eslint-disable-next-line
    }, [messages]);

  React.useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        id: id,
      });
    }

    return () => {
      //Component Unmount
      if (socket) {
        socket.emit("leaveRoom", {
          id: id,
        });
      }
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">Chatroom Name</div>
        <div className="chatroomContent">
          {messages.map((message, i) => (
            <div key={i} className="message">
              <span
                className={
                  userId === message.userId ? "ownMessage" : "otherMessage"
                }
              >
                {message.name}:
              </span>{" "}
              {message.message}
            </div>
          ))}
        </div>
        <div className="chatroomActions">
          <div>
            <input
              type="text"
              name="message"
              placeholder="Say something!"
              ref={messageRef}
            />
          </div>
          <div>
            <button className="join" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
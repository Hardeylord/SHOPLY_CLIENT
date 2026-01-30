import React, { useContext, useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import "../Components/rating.css";
import { Stomp } from "@stomp/stompjs";
import { userContext } from "../Authentication/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Handshake,
  LogOut,
  MessageSquare,
  Pointer,
  SendHorizontal,
  UserRound,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Chat_Io = () => {
  const { userName, bearerToken } = useContext(userContext);
  const stompClient = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [whoToText, setwhoToText] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [chatMessages, setchatMessages] = useState([]);
  const whoToText2 = useRef(null);
  const messagesEndRef = useRef(null);
  const [negotiate, setnegotiate] = useState(false);
  const [vendor, setvendor] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatMessages]);

  function connectToWebSocket() {
    if (userName) {
      let sockjs = new SockJS("http://localhost:8080/ws");
      stompClient.current = Stomp.over(sockjs);
      stompClient.current.connect({}, onConnect, onError);

      setIsConnected(true);
      toast.success("Succesfully connected... Click again to chat with vendor");
    } else {
      toast.error("Please Login to Negotiate Price");
    }
  }

  function onConnect() {
    // setIsConnected(true);
    stompClient.current.subscribe(
      `/user/${userName}/messages`,
      onMessageRecieved
    );
    stompClient.current.subscribe("/topic/public", onMessageRecieved)
    stompClient.current.send(
      "/app/user.connectUser",
      {},
      JSON.stringify({
        username: userName,
      })
    );
    fetchDisplayConnectedUsers();
  }

  async function fetchDisplayConnectedUsers() {
    try {
      const res = await fetch("http://localhost:8080/connectedUsers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        const usersWithoutInitiator = data.filter(
          (user) => user.username !== userName
        );
        setConnectedUsers(usersWithoutInitiator);
      }
    } catch (error) {
      toast.error(error);
    }
  }

  function onError(e) {
    toast.error(e);
  }

  function onMessageRecieved(Payload) {
    let message = JSON.parse(Payload.body);
    // console.log(message);
    // console.log(whoToText2)
    if (
      message.senderId === whoToText2.current ||
      message.recipientId === whoToText2.current
    ) {
      setchatMessages((prv) => [...prv, message]);
    }
  }

  async function userToChatWith(params) {
    whoToText2.current = params;
    setwhoToText(params);
    try {
      const resp = await fetch(
        `http://localhost:8080/messages/${userName}/${params}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      const data = await resp.json();
      setchatMessages(data);
    } catch (error) {
      toast.error(error + " ....");
    }
  }

  function sendMessage(e) {
    e.preventDefault();
    if (stompClient.current && messageContent) {
      const chatMessage2 = {
        senderId: userName,
        recipientId: whoToText,
        content: messageContent,
        timestamp: new Date(),
      };
      stompClient.current.send("/app/chat", {}, JSON.stringify(chatMessage2));
      setchatMessages((prv) => [...prv, chatMessage2]);
      setMessageContent("");
    }
  }

  function logoutUser() {
    if (stompClient.current) {
      stompClient.current.send(
        "/app/user.disconnectUser",
        {},
        JSON.stringify({ username: userName })
      );
      stompClient.current.disconnect();
    }
    stompClient.current.deactivate(); 
    toast.success("Logout successfully");
    setIsConnected(false);
  
  }

  window.onbeforeunload=()=>logoutUser();

  const colors = [
    "#FF006E", // Vivid Rose
    "#8338EC", // Blue Violet
    "#3A86FF", // Azure Blue
    "#FFBE0B", // Amber Yellow
    "#FB5607", // Orange Soda
    "#FF0000", // Bright Red
    "#00B4D8", // Star Command Blue
    "#BE0AFF", // Electric Purple
    "#FF70A6", // Baker-Miller Pink
    "#0077B6", // Honolulu Blue
  ];

  return (
    <>
      <Toaster />
      {isConnected ? (
        <Dialog>
          <DialogTrigger className="cursor-pointer flex space-x-2">
            <MessageSquare
              className="cursor-pointer"
              strokeWidth={1.25}
              onMouseEnter={() => setvendor(true)}
              onMouseLeave={() => setvendor(false)}
              color="white"
            />
            <div
              style={{
                opacity: vendor ? 1 : 0,
              }}
              className="h-6 flex transition-all duration-300 bg-white items-center p-1 rounded-xs"
            >
              <p className="text-xs font-montserrat">Chat with vendor</p>
            </div>
          </DialogTrigger>
          <DialogContent className="bg-black p-3 text-white border-[#7c7c7c] flex  h-[55vh] sm:max-w-[600px]">
            <DialogHeader className="sr-only">
              <DialogTitle className="sr-only">
                Negotiate Price with...
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <div className="w-full h-full gap-2 flex font-oswald">
              {/* conn user */}
              <div className="w-1/3 border-[1px] border-[#464646] p-2 rounded-xl h-full flex flex-col justify-between">
                <div className="flex gap-2 items-center">
                  <section className="relative text-black inline-flex items-center justify-center size-8 rounded-full bg-muted cursor-pointer">
                    <p>{userName.substring(0, 1).toUpperCase()}</p>
                    <span className="absolute top-0 -right-0.5 size-2.5 rounded-full bg-green-400 text-[11px]"></span>
                  </section>
                  <p>{userName}</p>
                </div>

                <div className="pl-5 space-y-3">
                  {connectedUsers.length > 0 ? (
                    connectedUsers.map((user, index) => (
                      <div
                        onClick={() => userToChatWith(user.username)}
                        key={index}
                        style={{
                          background:
                            whoToText2.current === user.username
                              ? "#00b800"
                              : "black",
                        }}
                        className="flex hover:bg-[#464646] rounded-[5px] gap-2 p-1 items-center cursor-pointer"
                      >
                        <section
                          style={{
                            backgroundColor: `${colors[index % colors.length]}`,
                          }}
                          className="flex justify-center items-center size-7 rounded-full  p-2"
                        >
                          <p>{user.username.substring(0, 1).toUpperCase()}</p>
                        </section>
                        <p>{user.username}</p>
                      </div>
                    ))
                  ) : (
                    <div>
                      <p>No connected Users</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 items-center">
                  <button onClick={logoutUser} className="bg-green-400 inline-flex items-center justify-center size-8 rounded-full">
                  <LogOut color="black" size={16} className="cursor-pointer" strokeWidth={1.25} />
                  </button>
                  <p>LogOut</p>
                </div>
              </div>

              {/* chatbox */}
              <div className="w-2/3 h-full border-[1px] border-[#464646] flex flex-col justify-between p-2 rounded-xl">
                {whoToText ? (
                  <div className="w-full  h-full flex flex-col justify-between">
                    {/* chats bg-[url(/chatsBg.png)]*/}
                    <div className="flex-1 chat-scrollbar bg-[url(/chatsBg.png)] pr-1 overflow-y-auto bg-cover bg-center space-y-1">
                      {chatMessages.length > 0 ? (
                        chatMessages.map((message, index) => (
                          <div
                            style={{
                              justifyContent:
                                message.senderId === userName
                                  ? "flex-end"
                                  : "flex-start",
                            }}
                            className="flex w-full"
                            key={index}
                          >
                            <div
                              style={{
                                backgroundColor:
                                  message.senderId === userName
                                    ? "#00b800"
                                    : "#263d54",
                              }}
                              className="py-2 px-3 rounded-2xl max-w-[70%] break-words"
                            >
                              <p className="font-light">{message.content}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center font-oswald">
                          No Chat Yet ...
                        </p>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                    {/* input and send button */}
                    <form
                      className="flex justify-center items-center gap-2"
                      onSubmit={sendMessage}
                      action=""
                    >
                      <input
                        type="text"
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        placeholder="type a message ..."
                        className="rounded-full placeholder:font-oswald border-2 font-light outline-0 px-2.5 py-1.5"
                      />
                      <button
                        type="submit"
                        className="bg-green-400 cursor-pointer size-9 rounded-full  p-2"
                      >
                        <SendHorizontal color="#101923" strokeWidth={1.23} />
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full ">
                    <DotLottieReact
                      autoplay
                      style={{ width: 220, height: 220 }}
                      loop
                      src="https://lottie.host/53c0ab5c-8fd7-4385-8802-0626b81007cf/gEFNrYpEZk.lottie"
                    />
                    <p className="font-oswald">
                      Negotiate Price With Our Vendors
                    </p>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="flex space-x-2">
          <Handshake
            color="white"
            className="cursor-pointer"
            onClick={connectToWebSocket}
            strokeWidth={1.25}
            onMouseEnter={() => setnegotiate(true)}
            onMouseLeave={() => setnegotiate(false)}
          />
          <div
            style={{
              opacity: negotiate ? 1 : 0,
            }}
            className="h-6 flex transition-all duration-300 bg-white items-center p-1 rounded-xs"
          >
            <p className="text-xs font-montserrat">Negotiate</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat_Io;

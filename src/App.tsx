import "./App.css";
import store, { RootState } from "./redux/store";

import { Provider, useSelector } from "react-redux";
import Router from "./container/RouterContainer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { io } from "socket.io-client";
import { messageSuccess } from "./utils/notifi";
import ChatBox from "./components/chat/Chat";
const URL = 'http://13.54.229.100:1234'
  // process.env.REACT_APP_API_SOCKET_IO_URL || 'http://localhost:1234'
export const socket = io(URL);

function App() {
  socket.on("connect", () => {
    console.log("Connected: ", socket.connected);
  });
 useEffect(() => {

   socket.on("message", (data) => {
     console.log(data);
     messageSuccess(data.data);
   });

   socket.on("chat-message", (data) => {
     console.log(data);
     messageSuccess(data.message);
   });
 }, []);
  return (
    <div className="App">
      <ToastContainer theme="dark" />
      <Router />
      <ChatBox/>
    </div>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import socket from "./SocketIo";
// import { createRoomApi } from "./api/testSocketIo";
// import { messageSuccess } from "./utils/notifi";

// interface Post {
//   id: number;
//   title: string;
//   content: string;
// }

// function App() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [newPostTitle, setNewPostTitle] = useState("");
//   const [newPostContent, setNewPostContent] = useState("");

//   useEffect(() => {
//     socket.on("posts", (posts: Post[]) => {
//       setPosts(posts);
//     });

//     socket.on("newPost", (newPost: Post) => {
//       alert("new post");
//       setPosts((prevPosts) => [...prevPosts, newPost]);
//     });

//     socket.emit("userConnect", "123123");

//     socket.on("userId", (userId) => {
//       console.log(`User ID: ${userId}`);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleAddPost = (event: React.FormEvent) => {
//     event.preventDefault();
//     if (newPostTitle && newPostContent) {
//       socket.emit("addPost", {
//         title: newPostTitle,
//         content: newPostContent,
//       });
//       setNewPostTitle("");
//       setNewPostContent("");
//     }
//   };

//   const [userId, setUserId] = useState("");
//   const [partnerId, setPartnerId] = useState("");
//   const [roomId, setRoomId] = useState("");
//   const [message, setMessage] = useState("");

//   const createRoom = async() => {

//     const response = await createRoomApi({ userId, partnerId });
//     console.log(response);

//     // socket.emit("create-room", { userId: userId, partnerId: partnerId });
//   };

//   const joinRoom = () => {
//     socket.emit("join-room", { roomId });
//   };

//   const sendMessage = () => {
//     socket.emit("send-message", { roomId: roomId, message: message });
//     console.log({ roomId: roomId, message: message });

//   };

//   useEffect(() => {
//     socket.on("room-created", ({ roomId, userId, partnerId }) => {
//       setRoomId(roomId);
//       console.log(`User with id: ${socket.id} joined room: ${roomId}`);
//     });

//     socket.on('message', (data) => {
//       console.log(data);

//       setMessage(data.data)
//       messageSuccess(data.data);
//     })

//   }, []);

//   return (
//     <div className="App">
//       <ToastContainer theme="dark" />
//       <h1>Real-time posts</h1>
//       <form onSubmit={handleAddPost}>
//         <label htmlFor="title">Title:</label>
//         <input
//           type="text"
//           id="title"
//           value={newPostTitle}
//           onChange={(event) => setNewPostTitle(event.target.value)}
//         />
//         <br />
//         <label htmlFor="content">Content:</label>
//         <textarea
//           id="content"
//           value={newPostContent}
//           onChange={(event) => setNewPostContent(event.target.value)}
//         />
//         <br />
//         <button type="submit">Add post</button>
//       </form>
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id}>
//             <h2>{post.title}</h2>
//             <p>{post.content}</p>
//           </li>
//         ))}
//       </ul>

//       <div>
//         <input
//           type="text"
//           placeholder="Your User ID"
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Partner User ID"
//           value={partnerId}
//           onChange={(e) => setPartnerId(e.target.value)}
//         />
//         <button onClick={() => createRoom()}>Create Room</button>
//         <input
//           type="text"
//           placeholder="Room ID"
//           value={roomId}
//           onChange={(e) => setRoomId(e.target.value)}
//         />
//         <button onClick={joinRoom}>Join Room</button>

//         <input
//           type="text"
//           placeholder="send message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={() => sendMessage()}>Sent mess</button>
//       </div>
//     </div>
//   );
// }

// export default App;

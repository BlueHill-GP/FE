// import React, { useState, useEffect } from "react";
// import { socket } from "../App";
// import { createRoomApi, getUserSocketId } from "../api/testSocketIo";
// import { messageSuccess } from "../utils/notifi";

// interface Post {
//   id: number;
//   title: string;
//   content: string;
// }

// function HomePage() {
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

//     // return () => {
//     //   socket.disconnect();
//     // };
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

//   const createRoom = async () => {
//     ;
//     // const response = await getUserSocketId({ userId });
//     const response1 = await createRoomApi({ userId, partnerId });
//     console.log(response1);

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

//     socket.on("message", (data) => {
//       setMessage(data.data);
//     });
//   }, []);

//   return (
//     <div className="App">
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
//   )
// }

import "../assets/css/HomePage.css";
import Categories from "../components/Categories";
import SetTime from "../components/SetTime";
const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-page-container">
        <div id="title" className="slide slide-homepage">
          <p>Cuoidi Cuoidi</p>
        </div>
        <div id="slide1" className="slide">
          <div className="slide-content">
            <h1 className="title-slide">Slide 1</h1>
            <p className="desc-slide">
              Lorem ipsum dolor sit amet, in velit iudico mandamus sit, persius
              dolorum in per, postulant mnesarchum cu nam. Malis movet ornatus
              id vim, feugait detracto est ea, eam eruditi conceptam in. Ne sit
              explicari interesset. Labores perpetua cum at. Id viris docendi
              denique vim.
            </p>
          </div>
        </div>
        <div id="slide2" className="slide">
          <div className="slide-content">
            <h1 className="title-slide">Slide 2</h1>
            <p className="desc-slide">
              Lorem ipsum dolor sit amet, in velit iudico mandamus sit, persius
              dolorum in per, postulant mnesarchum cu nam. Malis movet ornatus
              id vim, feugait detracto est ea, eam eruditi conceptam in. Ne sit
              explicari interesset. Labores perpetua cum at. Id viris docendi
              denique vim.
            </p>
          </div>
          <img src="https://thecontextofthings.com/wp-content/uploads/2014/12/2225.jpeg" />
          <img src="https://i.etsystatic.com/13562776/r/il/302ba2/1311368932/il_fullxfull.1311368932_dyo6.jpg" />
        </div>
        <div id="slide3" className="slide">
          <div className="slide-content">
            <h1 className="title-slide">Slide 3</h1>
            <p className="desc-slide">
              Lorem ipsum dolor sit amet, in velit iudico mandamus sit, persius
              dolorum in per, postulant mnesarchum cu nam. Malis movet ornatus
              id vim, feugait detracto est ea, eam eruditi conceptam in. Ne sit
              explicari interesset. Labores perpetua cum at. Id viris docendi
              denique vim.
            </p>
          </div>
        </div>
      </div>

      <div className="heartwrapper">
        <div className="heart x1"></div>
        <div className="heart x2"></div>
        <div className="heart x3"></div>
        <div className="heart x4"></div>
        <div className="heart x5"></div>
        <div className="heart x6"></div>
      </div>
    </div>
  );
};

export default HomePage;

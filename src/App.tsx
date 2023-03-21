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
import { Howl, Howler } from "howler";
import ChatBox from "./components/chat/Chat";
const URL = process.env.REACT_APP_API_SOCKET_IO_URL || 'http://localhost:1234'
  // 'http://13.54.229.100:1234'
  // process.env.REACT_APP_API_SOCKET_IO_URL || 'http://localhost:1234'
export const socket = io(URL);


function App() {
// import Nhac from '../public/Nhacchuong.mp3'
  let path = "../public/Nhacchuong.mp3";
  const sound = new Howl({
    src: [path],
  });
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
     sound.play();
   });
 }, []);
  
  sound.play();

  return (
    <div className="App">
      <ToastContainer theme="dark" />
      <Router />
      <ChatBox/>
    </div>
  );
}

export default App;


// function App() {
//   const sound = new Howl({
//     src: ["/Nhacchuong.mp3"],
//     volume: 0.5,
//     loop: true,
//   });

//   const handleClick = () => {
//     sound.play();
//   };

//   const handleMouseOver = () => {
//     sound.stop();
//   };

//   return (
//     <div>
//       <button onClick={handleClick} onMouseOver={handleMouseOver}>
//         Play sound
//       </button>
//     </div>
//   );
// }

//  export default App;

import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../src/assets/css/Posts.css";
function Posts() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axios
      .get("https://61bc10bdd8542f001782451e.mockapi.io/Posts")
      .then((response) => {
        const postArr = response.data
        console.log("array: ", postArr);
        setPosts(postArr.reduce((pre, value)=> {
          pre[value.id] = {...value}
          delete pre[value.id]["id"]

          return pre
        }, {}));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // like post
  console.log("map: ", posts);
  const [liked, setLiked] = useState(false);

  const handleLike = async (id) => {
    try {
      const isLike = !liked;
      if (isLike) {
        setPosts((pre) => {
          const next = { ...pre };
          next[id].posts_Like += 1;
          return next;
        });
      } else {
        setPosts((pre) => {
          const next = { ...pre };
          next[id].posts_Like -= 1;
          return next;
        });
      }
      setLiked(!liked);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post_Container">
      {posts && Object.entries(posts).map(([id, post]) => (
        <div key={id}>
          <div className="post">
            <div className="header_Post">
              <div className="user_Img">
                <img
                  src="https://notagamer.net/wp-content/uploads/2022/01/maxresdefault-1-1024x576.jpg"
                  alt=""
                ></img>
              </div>

              <p className="user_Name">Nguyen Bui Tai</p>
              <p className="posts_Time">{post.posts_Time}</p>
              <div className="add_Icon">
                <i className="fa-solid fa-user-plus"></i>
              </div>
            </div>

            <div className="body_Post">
              <p className="post_Caption">{post.posts_Caption}</p>
              <div className="post_Img">
                <img src={`${post.posts_Image}`} alt=""></img>
              </div>
            </div>

            <div className="footer_Post">
              <div>
                <button onClick={() => handleLike(id)}>
                  {liked ? "Unlike" : "Like"}
                  <i className="fa-solid fa-heart"></i>
                  <p>{post.posts_Like}</p>
                </button>
              </div>
              <div>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;

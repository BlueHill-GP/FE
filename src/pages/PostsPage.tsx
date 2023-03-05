import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/posts")
      .then((response) => {
        console.log(response.data.posts);
        
        
        setPosts(response.data.posts);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </div>
  );
};

export default PostsPage;

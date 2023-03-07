import { useEffect, useState } from "react";
import Post from "../components/Post";
import { getPost } from "../api/postApi";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    async function fetchData() {
      const response = await getPost();
      if (response.data) {
        setPosts(response.data.posts);
      }
    }

    fetchData();

    return () => {
      // Cleanup function
      setPosts([]); // Reset the state to an empty array
    };
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

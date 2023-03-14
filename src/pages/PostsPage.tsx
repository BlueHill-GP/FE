import { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";
import "../assets/css/PostsPage.css";
import Post, { PostProps } from "../components/Post";

const PostsPage = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  console.log("posts: ", posts);

  useEffect(() => {
    async function fetchData() {
      const response = await getPosts();
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
    <div className="post-container">
      {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </div>
  );
};

export default PostsPage;

const Post = ({ post }: any) => {
  console.log(post);
  console.log(post.description);
  
  return (
    <div>
      <p>{post.description}</p>
      <div className="post-images">
      {post.image.map((imageUrl: string, index: number) => (
        <img key={index} src={imageUrl} alt={`Post image ${index}`} />
      ))}
      </div>
      <p>Likes: {post.like.length}</p>
      <p>User: {post.user.username}</p>
      <p>Posted at: {new Date(post.createAt).toLocaleString()}</p>
    </div>
  );
};

export default Post;

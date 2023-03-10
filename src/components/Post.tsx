const Post = (props: any) => {
  return (
    <div>
      <p>{props.post.description}</p>
      <div className="post-images">
        {props.post.image.map((imageUrl: string, index: number) => (
          <img key={index} src={imageUrl} alt={`Post image ${index}`} />
        ))}
      </div>
      <p>Likes: {props.post.like.length}</p>
      <p>User: {props.post.user.username || props.user.name}</p>
      <p>Posted at: {new Date(props.post.createAt).toLocaleString()}</p>
    </div>
  );
};

export default Post;

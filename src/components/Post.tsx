import "../assets/css/Posts.css";

export interface PostProps {
  post: {
    image: string[];
    description: string;
    like: string[];
    isLiked: boolean;
    user: {
      username: string;
    } & any;
    createAt: number;
  } & any;
}

const Post = (props: PostProps) => {
  return (
    <div className="post_Container">
      <div className="post">
        <div className="header-post">
          <p className="user_Name">User: {props.post.user.username}</p>
          <p className="posts_Time">
            Posted at: {new Date(props.post.createAt).toLocaleString()}
          </p>
        </div>
        <p>{props.post.description}</p>
        <div>
          {props.post.image.length === 1 ? (
            <div className="post-image">
              <img src={props.post.image[0]} alt="Post image" />
            </div>
          ) : (
            <div className="post-images">
              <div className="post-images-col-1">
                <img src={props.post.image[0]} alt={`Post image`} />
              </div>
              <div className="post-images-col-2">
                {props.post.image
                  .slice(1, 4)
                  .map((imageUrl: string, index: number) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Post image ${index}`}
                      />
                  ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <p>Likes: {props.post.like.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;

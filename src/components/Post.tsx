import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleLikeIpa } from "../api/postApi";

import "../assets/css/Posts.css";
import { RootState } from "../redux/store";

export interface PostProps {
  post: {
    _id?: string;
    image: string[];
    description: string;
    like: string[];
    isLiked: boolean;
    user: {
      username: string;
    } & any;
    createAt: number;
    username?: string;
  } & any;
}
interface LikeData {
  [userId: string]: boolean;
}

const Post = (props: PostProps) => {
  const user = useSelector((state: RootState) => state.user);

    // function toggleLike(likeObj: LikeData, user: string) {
    //   if (user in likeObj) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
  
  function toggleLike(likeObj: LikeData | undefined, user: string): boolean {
    if (likeObj && user in likeObj) {
      return likeObj[user];
    } else {
      return false;
    }
  }
  const [like, setLike] = useState(toggleLike(props.post.like, user.userId));
  const handleLikePost = async () => {
    setLike(!like);
     const response = await handleLikeIpa(props.post._id);
  };


  return (
    <div className="post_Container">
      <div className="post">
        <div className="header-post">
          <p className="user_Name">
            <i className="fa-solid fa-user"></i>{" "}
            {props.post.user.username || props.post.username}
          </p>
          <p className="posts_Time">
            Đăng lúc: {new Date(props.post.createAt).toLocaleString()}
          </p>
        </div>
        <p className="post-desc">{props.post.description}</p>
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
          <p onClick={handleLikePost}>
            {like ? (
              <i className="fa-solid fa-heart"></i>
            ) : (
              <i className="fa-regular fa-heart"></i>
            )}
            {/* {props.post.like} */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;

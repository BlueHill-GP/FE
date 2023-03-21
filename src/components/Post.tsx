import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleLikeIpa } from "../api/postApi";
import { Image } from "antd";
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
      avatar: string;
    } & any;
    createAt: number;
    username?: string;
  } & any;
}
interface LikeData {
  [userId: string]: boolean;
}
const countTrueValues = (obj: { [key: string]: boolean }): number => {
  return Object.values(obj).reduce((acc, val) => acc + (val ? 1 : 0), 0);
};
const Post = (props: PostProps) => {
  const user = useSelector((state: RootState) => state.user);

  const [like, setLike] = useState(toggleLike(props.post.like, user.userId));
  const [likeNumber, setLikeNumber] = useState(
    props.post.like ? countTrueValues(props.post.like) : 0
  );
  const [currentPreviewImage, setCurrentPreviewImage] = useState(0)
  function toggleLike(likeObj: LikeData | undefined, user: string): boolean {
    if (likeObj && user in likeObj) {
      return likeObj[user];
    } else {
      return false;
    }
  }
  const handleLikePost = async () => {
    setLike(!like);
    if (like) {
      setLikeNumber(likeNumber - 1);
    } else {
      setLikeNumber(likeNumber + 1);
    }

    const response = await handleLikeIpa(props.post._id);
  };
  const [visible, setVisible] = useState(false);
  return (
    <div className="post_Container">
      <div className="post">
        <div className="header-post">
          <div className="row">
            <div className="">
              {props.post.user.avatar ? (
                <img
                  className="avatar-post"
                  src={props.post.user.avatar}
                  alt=""
                />
              ) : user.avatar ? (
                <img className="avatar-post" src={user.avatar} alt="" />
              ) : (
                <i className="fa-solid fa-user avatar-post"></i>
              )}
            </div>
            <div className="">
              <p className="user_Name">
                {props.post.user.username || props.post.username}
              </p>
              <p className="posts_Time">
                {new Date(props.post.createAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <p className="post-desc">{props.post.description}</p>
        <div>
          <>
            <Image
              className="post-image-hidden"
              preview={{ visible: false }}
              width={"100%"}
              src={props.post.image[currentPreviewImage]}
              onClick={() => setVisible(true)}
            />
            <div style={{ display: "none" }}>
              <Image.PreviewGroup
                preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
              >
                {props.post.image.map((image: any) => (
                  <Image src={image} />
                ))}
              </Image.PreviewGroup>
            </div>
          </>
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
          <div className="like-container row" onClick={handleLikePost}>
            {like ? (
              <i className="icon-heart-full fa-solid fa-heart"></i>
            ) : (
              <i className="icon-heart-null  fa-regular fa-heart"></i>
            )}
            <div className="like-number">
              {likeNumber === 0 ? "Tim đầu tiên!!" : likeNumber}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

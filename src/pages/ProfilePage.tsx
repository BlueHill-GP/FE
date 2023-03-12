import CreatePost from "../components/CreatePost";
import CreateServicePackage from "../components/CreateServicePackage";
import PhotographerInfo from "../components/PhotographerInfo";
import "../assets/css/ProfilePage.css"
const ProfilePage = () => {
  return (
    <div className="profilePage-container">
      <div>
        <PhotographerInfo />
      </div>
      <div>
        <CreatePost />
      </div>
      <div>
        <CreateServicePackage />
      </div>
    </div>
  );
};

export default ProfilePage;

import React, { useEffect, useState } from "react";
import { getPostByUser } from "../api/postApi";
import { getServicePackageByUser } from "../api/servicePackage";
import CreatePost from "../components/CreatePost";
import CreateServicePackage from "../components/CreateServicePackage";
import Post from "../components/Post";
import ServicePackage from "../container/servicePackageContainer";
import "../assets/css/ProfilePartnerPage.css"

interface IProp {
  user: {
    userId: string;
    name: string;
    email: string;
    userType: string;
  };
}
const CreateServicePackagePage = (props: IProp) => {
  const { user } = props;

  const [servicePackages, setPServicePackages] = useState([]);
  console.log(servicePackages);


  useEffect(() => {
    async function fetchData() {
      const response = await getServicePackageByUser(user.userId);
      if (response.data.data) {
        

        setPServicePackages(response.data.data);
      }
    }
    fetchData();
    return () => {
      setPServicePackages([]);
    };
  }, []);


  return (
    <div className="profile-container">
      <div className="profile-page">
        <div className="info">
          <h2 className="">
            <i className="fa-solid fa-circle-user"></i> {user.name}
          </h2>
          <h2 className="">
            <i className="fa-solid fa-camera"></i> {user.userType}
          </h2>
        </div>


        <div className="packageForPartner">
          <CreateServicePackage />
          <div >
            {servicePackages &&
              servicePackages.map((servicePackage, index) => (
                <ServicePackage servicePackage={servicePackage} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateServicePackagePage;

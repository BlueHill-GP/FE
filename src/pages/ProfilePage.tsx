import React from 'react'
import CreatePost from '../components/CreatePost'
import CreateServicePackage from '../components/CreateServicePackage';

const ProfilePage = () => {
    return (
      <div className="">
        <div>ProfilePage</div>
        <div>Tạo Post</div>
        <CreatePost />
        <div>Tạo service package</div>
        <CreateServicePackage />
      </div>
    );
}

export default ProfilePage
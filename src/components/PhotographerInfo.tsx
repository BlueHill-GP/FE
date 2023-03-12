import React from "react";
import "../assets/css/PhotographerInfo.css"
function PhotographerInfo() {
  return (
    
      <div className="photographer_Info">
        <div className="avt">
          <img
            src="https://static01.nyt.com/images/2019/02/05/world/05egg/15xp-egg-promo-superJumbo-v2.jpg"
            alt=""
          />
        </div>
        <div className="photographer_Name">
          <p>Nguyen Bui Tai</p>
        </div>
        <div className="location">
          <h3>Location</h3>
          <p>Da Nang</p>
        </div>
        <div className="about_Me">
          <h3>About me</h3>
          <p>
            Toi la mot nguoi dan ong dep trai vui tinh. Toi sinh nam 99, Toi
            muon lay vo tu lau roi ma cha co ma nao them.
          </p>
        </div>
      </div>
    
  );
}

export default PhotographerInfo;

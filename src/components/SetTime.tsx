import React from 'react'
import "../assets/css/SetTime.css"


function SetTime() {
  return (
    <div className="setTime_Container">
      <form action="" className="setTime_Form">
        <div>
          <label htmlFor="date">Ngày:</label>
          <input type="date" id="date" className="date-input" />
        </div>

        <div>
          <label htmlFor="time">Giờ:</label>
          <input type="time" id="time" className="time-input" />
        </div>

        <div>
          <label htmlFor="location">Địa điểm:</label>
          <input type="text" id="location" className="location-input" />
        </div>
        <button className="search-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
}

export default SetTime
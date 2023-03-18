import React from 'react'
import "../assets/css/Categories.css"
function Categories() {
  return (
    <div className="categories_Container">
      <ul className="categories_List">
        <li className="categories_Item">
          <a href="">
            <i className="fa-regular fa-calendar-days"></i>{" "}
            <p>Đặt lịch của tôi</p>
          </a>
        </li>
        <li className="categories_Item">
          <a href="">
            <i className="fa-solid fa-list"></i>
            <p>Danh sách giao dịch</p>
          </a>
        </li>
        <li className="categories_Item">
          <a href="">
            <i className="fa-solid fa-bell"></i>
            <p>Thông báo lịch trình</p>
          </a>
        </li>
        <li className="categories_Item">
          <a href="">
            <i className="fa-regular fa-envelope"></i>
            <p>Khuyến mãi</p>
          </a>
        </li>
        <li className="categories_Item">
          <a href="">
            <i className="fa-solid fa-gear"></i>
            <p>Tài khoản</p>
          </a>
        </li>
        <li className="categories_Item">
          <a href="">
            <i className="fa-solid fa-power-off"></i>
            <p>Đăng xuất</p>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Categories
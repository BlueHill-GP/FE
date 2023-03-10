import React from "react";
import { Link } from "react-router-dom";
import { logoblack } from "../../assets";
import "./Header.css";
interface IProp {
  logout: () => void;
  changeRoute:(route:string)=> void;
}
function Header(props: IProp) {
  const { logout, changeRoute } = props;
  return (
    <header className="header">
      <div className="logo">
        <img alt="" src={logoblack} />
      </div>
      <ul className="menu">
        <li>
          <div onClick={() => changeRoute("new")}>Bản tin</div>
        </li>
        <li>
          <div className="search">
            <input className="box_Input" />
            <button type="submit" className="search_Button">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </li>
        <li>
          <div onClick={() => changeRoute("profile")}>
            Hợp Tác Với Chúng Tôi
          </div>
        </li>
        <li>
          <Link to="/set-time">Đặt Lịch Của Tôi</Link>
        </li>
        <li>
          <a href="#">Đã Lưu</a>
        </li>
      </ul>

      <div className="header_Auth">
        <Link to="/login" className="signin_Btn">
          <i className="fa-solid fa-user"></i>
          Đăng Nhập
        </Link>
        <Link to="/register" className="signup_Btn">
          Đăng Kí
        </Link>
        <div onClick={() => logout()}>Đăng xuất </div>
      </div>
    </header>
  );
}

export default Header;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logoblack } from "../../assets";
import "../../assets/css/Header.css";

interface IProp {
  logout: () => void;
  changeRoute: (route: string) => void;
}
function Header(props: IProp) {
  const { logout, changeRoute } = props;

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Kiểm tra ô input search có rỗng hay không
    if (query === "") {
      // Nếu rỗng, đặt kết quả tìm kiếm thành mảng rỗng
      setResults([]);
    } else {
      // Nếu không rỗng, thực hiện tìm kiếm và đặt kết quả tìm kiếm vào state
      // ...
    }
  }, [query]);

  const handleSearch = () => {
    axios
      .get(
        `https://61bc10bdd8542f001782451e.mockapi.io/Packages?TitlePackage=${query}`
      )
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="header_container">
      <header className="header">
        <div className="logo">
          <img alt="" src={logoblack} />
        </div>
        <ul className="menu">
          <li>
            <Link to="new">Bản tin</Link>
          </li>
          
            <div className="search">
              <input className="box_Input" />
              <button type="submit" className="search_Button">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          
          <li>
            <a href="">
              <Link to="profile">Hợp Tác</Link>
            </a>
          </li>
          <li>
            <a href="">
              <Link to="/booking">Đặt Lịch</Link>
            </a>
          </li>
          <li>
            <a href="">
              <Link to="/my-booking">My booking</Link>
            </a>
          </li>
          <li>
            <a href="#">Đã Lưu</a>
          </li>
        </ul>

        {/* menu hide */}
        <div className="menu-hide">
          <input
            hidden
            type="checkbox"
            id="nav-tablets-input"
            className="nav__input"
          />
          <label htmlFor="nav-tablets-input" className="over_lay" />
          <div className="nav_tablets">
            <ul className="nav_tablets__list-nav">
              <label htmlFor="nav-tablets-input" className="border-before" />
              <div className="logo-menu">
                <img alt="" src={logoblack} />
              </div>
              <li className="nav_tablets__list-item">
                <a href="">Bản tin</a>
              </li>
              <li className="nav_tablets__list-item">
                <a href="">Hợp tác</a>
              </li>
              <li className="nav_tablets__list-item">
                <a href="">Đặt lịch</a>
              </li>
              <li className="nav_tablets__list-item">
                <a href="">Đã lưu</a>
              </li>
              <li className="nav_tablets__list-item">
                <a href="">Đăng ký</a>
              </li>
              <li className="nav_tablets__list-item">
                <a href="">Đăng xuất</a>
              </li>

              <label htmlFor="nav-tablets-input" className="border-before" />
            </ul>
          </div>
        </div>

        <div className="header_Auth">
          <Link to="/login" className="signin_Btn">
            <i className="fa-solid fa-user"></i>
            Đăng Nhập
          </Link>
          <Link to="/register" className="signup_Btn">
            Đăng Kí
          </Link>
          {/* <div onClick={() => logout()}>Đăng xuất </div> */}
        </div>

        <div className="search_hide">
          <input
            className="box_Input"
            onKeyDown={handleKeyDown}
            value={query}
            onChange={handleInputChange}
          ></input>

          <button
            type="submit"
            className="search_Button"
            onClick={handleSearch}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <label htmlFor="nav-tablets-input" className="nav-bars">
          <li className="nav-bars-item">
            <i className="fa fa-bars" />
          </li>
        </label>
      </header>
    </div>
  );
}

export default Header;

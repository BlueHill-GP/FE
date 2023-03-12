import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { logoblack } from "../../assets";
import "../../assets/css/Header.css";
interface IProp {
  logout: () => void;
}
function Header(props: IProp) {
  const { logout } = props;

  // search
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

  const handleKeyDown = (event:any) => {
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
        <ul className={"menu"}>
          <li>
            <a href="#">Bản tin</a>
          </li>

          <div className="search">
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

          <li>
            <a href="#">Hợp Tác</a>
          </li>
          <li>
            <a href="#">Đặt Lịch</a>
          </li>
          <li>
            <a href="#">Đã Lưu</a>
          </li>
        </ul>

        <div className="header_Auth">
          <a href="#" className="signin_Btn">
            <i className="fa-solid fa-user"></i>
            Đăng Nhập
          </a>

          <a href="#" className="signup_Btn">
            Đăng Kí
          </a>
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
      </header>

      <div className="modelShow">
        {results.map((result:any) => (
          <ul className="search_List" key={result.id}>
            <li className="search_Item">
              <div className="search_Content">
                <h3>{result.TitlePackage}</h3>
                <p>{result.DescPackage}</p>
              </div>
              <div className="search_Img">
                <img src={result.ImagePackage} alt="" />
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default Header;

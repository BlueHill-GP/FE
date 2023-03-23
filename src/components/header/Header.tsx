import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logoblack } from "../../assets";
import "../../assets/css/Header.css";

interface IProp {
  logout: () => void;
  changeRoute: (route: string) => void;
  user: {
    userId: string;
    name: string;
    email: string;
    userType: string;
    avatar: string;
  };
}
function Header(props: IProp) {
  const { logout, changeRoute, user } = props;

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
        <Link to="/" className="logo">
          <img alt="" src={logoblack} />
        </Link>
        <ul className="menu">
          <li>
            <Link className="menu-item" to="new">
              Bản tin
            </Link>
          </li>

          <div className="search row">
            <input className="box_Input" />
            <button type="submit" className="search_Button">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          {user.userType === "couple" ? (
            <>
              <li>
                <Link className="menu-item" to="/booking">
                  Đặt Lịch
                </Link>
              </li>

              <li>
                <Link className="menu-item" to="/user-booking">
                  Lịch của tôi
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="menu-item" to="profile">
                  Trang cá nhân
                </Link>
              </li>

              <li>
                <Link className="menu-item" to="/my-booking">
                  Đơn hàng
                </Link>
              </li>
            </>
          )}
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
              {user.userType === "couple" ? (
                <>
                  <h2 className="">
                    <i className="fa-solid fa-circle-user"></i> {user.name}
                  </h2>
                  <li>
                    <Link className="menu-item" to="/booking">
                      Đặt Lịch
                    </Link>
                  </li>

                  <li>
                    <Link className="menu-item" to="/user-booking">
                      Lich của tôi
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="signup_Btn" onClick={() => logout()}>
                      Đăng xuất
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <h2 className="">
                    <img src={user.avatar} alt="" />
                    <i className="fa-solid fa-circle-user"></i>
                    {user.name}
                  </h2>
                  {/* <li>
                    <Link className="menu-item" to="/create-service-package">
                      Create Package
                    </Link>
                  </li> */}
                  <li>
                    <Link className="menu-item" to="profile">
                      Profile
                    </Link>
                  </li>

                  <li>
                    <Link className="menu-item" to="/my-booking">
                      My booking
                    </Link>
                  </li>

                  <li>
                    <Link to="" className="signup_Btn" onClick={() => logout()}>
                      Đăng xuất
                    </Link>
                  </li>
                </>
              )}

              <label htmlFor="nav-tablets-input" className="border-before" />
            </ul>
          </div>
        </div>

        <div className="header_Auth">
          <Link to="/login" className="signin_Btn">
            {user.avatar ? (
              <img className="avatar-post" src={user.avatar} alt="" />
            ) : (
              <i className="fa-solid fa-user"></i>
            )}

            <p>{user.name}</p>
          </Link>
          <Link to="" className="signup_Btn" onClick={() => logout()}>
            <i className="fa-solid fa-right-from-bracket"></i>
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

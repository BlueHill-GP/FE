import { Link, Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/hearder/Header";
const myStyles = {
  backgroundColor: "gray",
  color: "white",
  padding: "10px",
  borderRadius: "5px",
};

const mainStyles = {
  minHeight: "70vh",

}
const MainLayout = () => {
  return (
    <div>
      <Header />
      <header style={myStyles}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/set-time">set time</Link>
            </li>
            <li>
              <Link to="/profile">profile</Link>
            </li>
           
            <li>
              <Link to="/new">New</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main style={mainStyles}>
        <Outlet />
      </main>
      <Footer />
      {/* <footer style={myStyles}>
        <p>&copy; 2023 My Website</p>
      </footer> */}
    </div>
  );
};

export default MainLayout;
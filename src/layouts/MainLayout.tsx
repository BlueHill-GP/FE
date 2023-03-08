import { Link, Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../container/HeaderContainer";
const myStyles = {
  backgroundColor: "gray",
  color: "white",
  padding: "10px",
  borderRadius: "5px",
};

const mainStyles = {
  minHeight: "70vh",
};
const MainLayout = () => {
  return (
    <div>
      <Header />
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

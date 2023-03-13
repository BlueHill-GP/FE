import { connect } from "react-redux";
import { RootState } from "../redux/store";
import { changeRoute } from "../redux/slide/routeSlice";
import Header from "../components/header/Header";
import { logout } from "../redux/slide/authSlice";

const mapActionToLogin = {
  logout,
  changeRoute,
};
const mapStateToProps = (state: RootState) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, mapActionToLogin)(Header);

import { connect } from "react-redux";
import { setLoginState } from "../redux/slide/authSlice";
import { changeRoute } from "../redux/slide/routeSlice";
import { RootState } from "../redux/store";
import Router from "../router";



const mapActionToRouter = {
  setLoginState
};
const mapStateToProps = (state: RootState) => {
  return {
    isLogin: state.auth.isLogin,
    userType: state.user.userType,
  };
};

export default connect(mapStateToProps, mapActionToRouter)(Router);

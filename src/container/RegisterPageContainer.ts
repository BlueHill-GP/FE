import { connect } from "react-redux";
import { RootState } from "../redux/store";
import { RegisterPage } from "../pages/RegisterPage";
import { resendOtp, verifyOtpRegister } from "../redux/slide/authSlice";
import { changeRoute } from "../redux/slide/routeSlice";

const mapActionToLogin = {
  verifyOtpRegister,
  changeRoute,
  resendOtp,

};
const mapStateToProps = (state: RootState) => {
  return {
  };
};

export default connect(mapStateToProps, mapActionToLogin)(RegisterPage);

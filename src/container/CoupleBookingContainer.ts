import { connect } from "react-redux";
import CoupleBookingPage from "../pages/CoupleBookingPage";
import { RootState } from "../redux/store";

const mapActionToLogin = {};
const mapStateToProps = (state: RootState) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapActionToLogin)(CoupleBookingPage);

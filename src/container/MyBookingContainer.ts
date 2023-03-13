import { connect } from "react-redux";
import MyBooking from "../components/MyBooking";
import { RootState } from "../redux/store";

const mapActionToLogin = {};
const mapStateToProps = (state: RootState) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapActionToLogin)(MyBooking);

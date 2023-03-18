import { connect } from "react-redux";
import ProfilePage from "../pages/ProfilePartnerPage";
import { setUser } from "../redux/slide/profileSlice";

import { RootState } from "../redux/store";

const mapActionToLogin = {
  setUser,
};
const mapStateToProps = (state: RootState) => {
    return {
      user: state.user
  };
};

export default connect(mapStateToProps, mapActionToLogin)(ProfilePage);

import { connect } from "react-redux";
import ProfilePage from "../pages/ProfilePartnerPage";

import { RootState } from "../redux/store";

const mapActionToLogin = {
 
};
const mapStateToProps = (state: RootState) => {
    return {
      user: state.user
  };
};

export default connect(mapStateToProps, mapActionToLogin)(ProfilePage);

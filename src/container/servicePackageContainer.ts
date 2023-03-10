import { connect } from "react-redux";
import ServicePackage from "../components/ServicePackage";

import { RootState } from "../redux/store";

const mapActionToLogin = {};
const mapStateToProps = (state: RootState) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapActionToLogin)(ServicePackage);

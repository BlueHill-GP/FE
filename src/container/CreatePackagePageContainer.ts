import { connect } from "react-redux";
import CreateServicePackagePage from "../pages/CreateServicePackagePage";


import { RootState } from "../redux/store";

const mapActionToLogin = {
 
};
const mapStateToProps = (state: RootState) => {
    return {
      user: state.user
  };
};

export default connect(
  mapStateToProps,
  mapActionToLogin
)(CreateServicePackagePage);

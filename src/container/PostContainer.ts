import { connect } from "react-redux";
import Post from "../components/Post";


import { RootState } from "../redux/store";

const mapActionToLogin = {};
const mapStateToProps = (state: RootState) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapActionToLogin)(Post);

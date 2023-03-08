import { connect } from "react-redux";
import { changeRoute } from "../redux/slide/routeSlice";
import { RootState } from "../redux/store";
import Router from "../router";



const mapActionToRouter = {
  changeRoute,
};
const mapStateToProps = (state: RootState) => {
  return {
   route: state.route.route
  };
};

export default connect(mapStateToProps, mapActionToRouter)(Router);

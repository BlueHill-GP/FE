import "./App.css";
import store from "./redux/store";

import { Provider } from "react-redux";
import Router from "./container/RouterContainer";
import Header from "./container/HeaderContainer";
import Posts from "./components/Posts";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
function App() {
  
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <ProfilePage />
        {/* <HomePage/> */}
        {/* <Posts/> */}
        {/* <Router/> */}
      </div>
    </Provider>
  );
}

export default App;

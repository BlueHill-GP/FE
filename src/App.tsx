import "./App.css";
import store from "./redux/store";

import { Provider } from "react-redux";
import Router from "./container/RouterContainer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ToastContainer theme="dark" />
        <Router />
      </div>
    </Provider>
  );
}

export default App;

import "./App.css";
import store from "./redux/store";

import { Provider } from "react-redux";
import Router from "./container/RouterContainer";



function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router/>
      </div>
    </Provider>
  );
}

export default App;

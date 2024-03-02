import "./App.css";
import FormPage1 from "./Component/FormPage1";
import { Provider } from "react-redux";
import {store} from './app/store'
import FormPage2 from "./Component/FormPage2";
import { useState } from "react";

function App() {
  const [check,setCheck] = useState(false)
  return (
    <Provider store={store}>
      <div className="App">
        {!check ? <FormPage1 setCheck={setCheck}/> : <FormPage2/>}
      </div>
    </Provider>
  );
}

export default App;

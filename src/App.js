import './App.css';
import {useRoutes} from "react-router-dom";
import {ROUTE} from "./router/Router";

function App() {
  return (
      useRoutes(ROUTE)
  )
}

export default App;

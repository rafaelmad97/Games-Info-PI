import { Route, Switch } from "react-router-dom";
import "./App.css";
import LangingPage from "./components/landingPage/landingPage";
import HomePage from "./components/homePage/homePage";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Switch>
          <Route path="/" exact component={LangingPage} />
          <Route path="/home" component={HomePage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;

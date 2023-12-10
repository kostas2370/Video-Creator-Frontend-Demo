import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home_component";
import React from "react";
import FullVideoComponent from "./components/full_video_component";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} />} />
            <Route
              path="/video/:video"
              render={(props) => <FullVideoComponent {...props} />}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

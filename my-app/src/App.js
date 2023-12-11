import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home_component";
import React from "react";
import FullVideoComponent from "./components/full_video_component";
import { Header } from "./components/header";
import AvatarFormComponent from "./components/avatar_creation_component";
import VideoResultComponent from "./components/video_results_component";
function App() {
  return (
    <div>
      <Header></Header>

      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} />} />
            <Route
              path="/video/:video"
              render={(props) => <FullVideoComponent {...props} />}
            />
            <Route exact path="/avatar_creation" render={(props) => <AvatarFormComponent {...props} />} />

            <Route exact path="/video_results" render={(props) => <VideoResultComponent {...props} />} />

          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import image from './viddie_banner.png'
const url = "http://localhost:3000";
export const Header = () => {
  return (
    <nav className="ccsticky-nav">
    <ul>
      <li><a href={url + "/"}>Generation</a></li>
      <li><a href={url + "/avatar_creation"}>Narrator</a></li>
      <li><a href={url + "/video_results"}>Videos</a></li>
      <center><h2 className="viddie-banner"><span >VIDDIE:</span> The AI video Generator</h2>  </center>

    </ul>
  </nav>
  );
};

export default Header;
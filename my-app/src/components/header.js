import React from "react";
const url = "http://localhost:3000";
export const Header = () => {
  return (
    <nav className="ccsticky-nav">
    <ul>
      <li><a href={url + "/"}>Generation</a></li>
      <li><a href={url + "/avatar_creation"}>Narrator</a></li>
      <li><a href={url + "/video_results"}>Videos</a></li>
      <center><h2 className="viddie-banner"> The AI video Creator</h2>  </center>

    </ul>
  </nav>
  );
};

export default Header;
import React from "react";

const url = "http://localhost:3000";
export const Header = () => {
  return (
    <nav className="ccsticky-nav">
      
    <ul>
      <li><a href={url + "/"}>Home</a></li>
      <li><a href={url + "/avatar_creation"}>Avatar Creation</a></li>
      <li><a href={url + "/video_results"}>Video Results</a></li>
    </ul>
  </nav>
  );
};

export default Header;
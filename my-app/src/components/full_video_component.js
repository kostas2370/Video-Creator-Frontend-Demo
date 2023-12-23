import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { request } from "./apicalls";
import axios from "axios";
import { API_BASE_URL } from "./apicalls";
import Scene from "./scene";

const FullVideoComponent = (props) => {
  const { video } = useParams();
  const [currentvideo, setCurrentvideo] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      const videos = await request("video/" + video + "/");
      setCurrentvideo(videos);
      setTitle(videos.title);
    };
    fetchVideos();
  }, []);

  const update_title = (event) => {
    event.preventDefault();
    axios.patch(API_BASE_URL + "/video/" + video + "/", {
      title: title,
    });
  };

  return (
    <div className="FullvideoContainer">
      <center>
        {!currentvideo ? (
          <p></p>
        ) : (
          <div className="fullvideo">
            <form onSubmit={update_title} className="fullvidform">
              <input
                className="titletext"
                value={title}
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />

              <button className="btn-sub" type="submit">
                Update
              </button>
              <button className="btn-sub">Regenerate</button>
              <button className="btn-sub">Render</button>
            </form>
            <div className="scene_container">
              {currentvideo.scenes.map((scene) => {
                return <Scene scene={scene} />;
              })}
            </div>
          </div>
        )}
      </center>
    </div>
  );
};

export default FullVideoComponent;

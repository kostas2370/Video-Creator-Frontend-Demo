import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { request } from "./apicalls";
import Video from "./video";
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
              <h2>Title : </h2>
              <form onSubmit={update_title}>
                <input
                  className="titletext"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <button className="btn-sub" type="submit">
                  update
                </button>
              </form>
              <div className="scene_container">
                {currentvideo.scenes.map((scene) => {
                  return <Scene scene ={scene}/>;
                })}
              </div>
            </div>
          )}
        </center>
      
    </div>
  );
};

export default FullVideoComponent;

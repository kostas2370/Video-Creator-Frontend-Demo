import React, { useState, useEffect } from "react";
import { API_BASE_URL, MEDIA_URL } from "./apicalls";
import axios from "axios";

function Scene({ scene }) {
  const [sceneText, setSceneText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSceneText(scene.text);
  }, []);

  const update_scene_text = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .patch(API_BASE_URL + "/scene/" + scene.id + "/", {
        text: sceneText,
      })
      .then((response) => {
        alert("Scene updated sucessfuly")
        window.location.reload(false);
      });
  };


  const generate_scene_text = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .patch(API_BASE_URL + "/scene/" + scene.id + "/generate/", {
        text: sceneText,
      })
      .then((response) => {
        alert("Scene updated sucessfuly")
        window.location.reload(false);
      });
  };

  return (
    <div className="container">
      <div className="side audio">
        <audio controls className="aud" key={scene.text}>
          <source src={MEDIA_URL + scene.file} type="audio/mpeg" />
        </audio>
        
          <textarea
            className="scenetxt"
            value={sceneText}
            onChange={(e) => setSceneText(e.target.value)}
          />
          {!loading ? (
            <div className="audio_butts">
              <button className="btt btn-submit" onClick={update_scene_text}>Update</button>
              <button className="btt btn-submit" onClick={generate_scene_text}>Regenerate</button>
            </div>
          ) : (
            <></>
          )}
      
      </div>
      <div class="side text">
        <div class="text-content">
          <p>This is the text inbox</p>
        </div>
      </div>
    </div>
  );
}

export default Scene;

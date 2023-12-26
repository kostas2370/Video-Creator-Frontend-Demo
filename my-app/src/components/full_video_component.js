import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { request } from "./apicalls";
import axios from "axios";
import { API_BASE_URL } from "./apicalls";
import Scene from "./scene";

const FullVideoComponent = (props) => {
  const { video } = useParams();
  const [currentvideo, setCurrentvideo] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      const videos = await request("video/" + video + "/");
      setCurrentvideo(videos);
      setTitle(videos.title);
      const avatat_options = await request("avatars/");
      setAvatar(avatat_options);
      setSelectedAvatar(videos.avatar);
    };
    fetchVideos();
  }, []);

  const update_title = (event) => {
    event.preventDefault();
    axios.patch(API_BASE_URL + "/video/" + video + "/", {
      title: title,
    });
  };

  const update_avatar = (event) => {
    event.preventDefault();
    axios.patch(API_BASE_URL + "/video/" + video + "/", {
      avatar: selectedAvatar,
    });
  };

  return (
    <div className="FullvideoContainer">
      <center>
        {!currentvideo ? (
          <p></p>
        ) : (
          <>
            <div className="fullvideo vidcontform">
              <form onSubmit={update_title} className="fullvidform">
                <span className="title-label">Title :</span>
                <input
                  className="titletext"
                  value={title}
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />

                <button className="btn-sub" type="submit">
                  Update
                </button>
              </form>

              <form
                onSubmit={update_avatar}
                className="fullvidform avatar-select-form"
              >
                <span className="title-label">Avatar :</span>
                {!avatar ? (
                  <p>Loading...</p>
                ) : (
                  <select
                    id="avatar"
                    onChange={(e) => setSelectedAvatar(e.target.value)}
                    name="avatar_selection"
                    value={selectedAvatar}
                  >
                    <option key="No avatar" value="no_avatar">
                      No Avatar
                    </option>
                    {avatar.map((avatar) => (
                      <option key={avatar.name} value={parseInt(avatar.id)}>
                        {avatar.name}
                      </option>
                    ))}
                  </select>
                )}

                <button className="btn-sub" type="submit">
                  Update
                </button>
              </form>
              </div>
              <div className="fullvideo">
              <div className="scene_container">
                {currentvideo.scenes.map((scene) => {
                  return <Scene scene={scene} />;
                })}
              </div>

              <div className="full-video-butts">
                <button className="btn-sub">Regenerate</button>
                <button
                  className="btn-sub"
                  onClick={async (e) => {
                    e.preventDefault();
                    axios.post(API_BASE_URL + "/render/?video_id=" + video);
                  }}
                >
                  Render
                </button>
              </div>
            </div>
          </>
        )}
      </center>
    </div>
  );
};

export default FullVideoComponent;

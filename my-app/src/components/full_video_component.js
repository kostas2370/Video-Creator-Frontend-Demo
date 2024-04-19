import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { request } from "./apicalls";
import axios from "axios";
import { API_BASE_URL } from "./apicalls";
import Scene from "./scene";
import { MEDIA_URL } from "./apicalls";
import SelectedVideo from "./selected_vid";
import Dropbox from "./dropbox_comp";

const FullVideoComponent = (props) => {
  const { video } = useParams();
  const [currentvideo, setCurrentvideo] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedIntro, setSelectedIntro] = useState(null);
  const [Intros, setIntros] = useState(null);
  const [selectedOutro, setSelectedOutro] = useState(null);
  const [Outros, setOutros] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      const videos = await request("video/" + video + "/");
      setCurrentvideo(videos);
      setTitle(videos.title);
      const avatat_options = await request("avatars/");
      setAvatar(avatat_options);
      setSelectedAvatar(videos.avatar);
      const intro_options = await request("intro/");
      setIntros(intro_options);
      setSelectedIntro(videos.intro);

      const outro_options = await request("outro/");
      setOutros(outro_options);
      setSelectedOutro(videos.outro);
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
    alert("Update Success !!");
  };

  const update_intro = (event) => {
    event.preventDefault();
    console.log(selectedIntro);
    axios.patch(API_BASE_URL + "/video/" + video + "/", {
      intro: selectedIntro,
    });
    alert("Update Success !!");
  };

  const update_outro = (event) => {
    event.preventDefault();
    console.log(selectedIntro);
    axios.patch(API_BASE_URL + "/video/" + video + "/", {
      outro: selectedOutro,
    });
    alert("Update Success !!");
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

              <hr className="hrl"></hr>

              <Dropbox
                label="Intro:"
                setSelectedValue={setSelectedIntro}
                value_list={Intros}
                selected_value={selectedIntro}
                update_func={update_intro}
              />
              <SelectedVideo vid_List={Intros} vid={selectedIntro} />
              <hr className="hrl"></hr>
              <Dropbox
                label="Outro:"
                setSelectedValue={setSelectedOutro}
                value_list={Outros}
                selected_value={selectedOutro}
                update_func={update_outro}
              />
              <SelectedVideo vid_List={Outros} vid={selectedOutro} />
              <hr className="hrl"></hr>

              <Dropbox
                label="Avatar:"
                setSelectedValue={setSelectedAvatar}
                value_list={avatar}
                selected_value={selectedAvatar}
                update_func={update_avatar}
              />
            </div>

            <div className="fullvideo">
              <div className="scene_container">
                {currentvideo.scenes.map((scene) => {
                  return <Scene scene={scene} />;
                })}
              </div>
              {loading ? (
                <>Loading...</>
              ) : (
                <div className="full-video-butts">
                  <button
                    className="btn-sub"
                    onClick={async (e) => {
                      e.preventDefault();
                      setLoading(true);
                      axios
                        .get(
                          API_BASE_URL +
                            "/video/" +
                            video +
                            "/video_regenerate/"
                        )
                        .then((response) => {
                          setLoading(false);
                          alert("Video got regenerated Successfuly");
                        });
                    }}
                  >
                    Regenerate
                  </button>
                  <button
                    className="btn-sub"
                    onClick={async (e) => {
                      e.preventDefault();
                      setLoading(true);
                      axios
                        .get(
                          API_BASE_URL + "/video/" + video + "/render_video/"
                        )
                        .then((response) => {
                          setLoading(false);
                          alert("Video got rendered Successfuly");
                        });
                    }}
                  >
                    Render
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </center>
    </div>
  );
};

export default FullVideoComponent;

import axios from "axios";
import React from "react";
import { API_BASE_URL } from "./apicalls";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function Video({ vid }) {
  

  return (
    <div className="VideoContainer">
      <center>
        <h3 className="vid_title">{vid.title}</h3>
        {vid.status === "RENDERING" ? (
          <img
            src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-18-223_512.gif"
            className="loading_gif"
            alt="Loading Gif"
            decoding="async"
            fetchpriority="high"
            title="Loading Gif"
            data-lazy-src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1262.gif"
            data-was-processed="true"
          ></img>
        ) : (
          <video key={vid.output} controls>
            <source src={vid.output} />
          </video>
        )}

        <h3>User Prompt:</h3>
        <textarea
          className="gpt_answer"
          value={vid.prompt.prompt}
          readOnly
          key={vid.prompt.prompt}
        ></textarea>

        <h3>GPT ANSWER:</h3>
        <textarea
          className="gpt_answer"
          value={vid.gpt_answer}
          readOnly
          key={vid.gpt_answer}
        ></textarea>
        <div>
          <h3>Status : {vid.status}</h3>
        </div>
        {vid.status === "GENERATED" ? (
          <></>
        ) : (
          <div className="video-btn">
            <button
              type="submit"
              className="btn-submit"
              onClick={async (e) => {
                e.preventDefault();
                vid.status = "RENDERING";
                axios.get(API_BASE_URL + "/video/" + vid.id + "/render_video/");
              }}
            >
              Render
            </button>
              <Link to={`/video/${vid.id}`}>
            <button
              className="btn-submit"
            >
              EDIT
            </button>
            </Link>
          </div>
        )}
      </center>
    </div>
  );
}

export default Video;

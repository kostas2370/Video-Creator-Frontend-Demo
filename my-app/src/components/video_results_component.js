import React, { useEffect, useState } from "react";
import { request } from "./apicalls";
import axios from "axios";
import Video from "./video";

const VideoResultComponent = () => {
  const [video, setVideo] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      const videos = await request("video/");
      setVideo(videos);
    };
    fetchVideos();
  }, []);

  return (
    <center>
      <table className="back">
        <tbody>
          <tr>
            <td>
              <center>
                <h3>Video Generation</h3>
              
              <div className="vires vidtable">
                {!video ? (
                  <p></p>
                ) : (
                  <div>
                     <center><ul>
                      {video.results.map((vid) => {
                        return (
                          <li key={vid.id}>
                           <Video vid={vid}></Video>
                          </li>
                        );
                      })}
                    </ul>
                    </center>
                    <div className="buttons-container">
                      {video.previous ? (
                        <button
                          type="submit"
                          className="btn-submit"
                          onClick={async (e) => {
                            e.preventDefault();

                            const response = await axios.get(video.previous);
                            setVideo(response.data);
                          }}
                        >
                          Previous
                        </button>
                      ) : (
                        <p></p>
                      )}
                      {video.next ? (
                        <button
                          type="submit"
                          className="btn-submit"
                          onClick={async (e) => {
                            e.preventDefault();
                            axios.get(video.next).then((response) => {
                              setVideo(response.data);
                            });
                          }}
                        >
                          Next
                        </button>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              </center>
            </td>
          </tr>
        </tbody>
      </table>
    </center>
  );
};

export default VideoResultComponent;

import React, { useState, useEffect } from "react";
import { API_BASE_URL, MEDIA_URL } from "./apicalls";
import axios from "axios";

function SelectedVideo({ vid_List, vid }) {
  return (
    <>
      {!vid || vid == "no_video" ? (
        <></>
      ) : (
        <>
          {vid_List.map((item, index) => {
            if (vid == item.id.toString()) {
              return (
                <center>
                  <div>
                    <video
                      controls
                      src={item.file}
                      className="intro_video"
                    ></video>
                  </div>
                </center>
              );
            }
          })}
        </>
      )}
    </>
  );
}

export default SelectedVideo;
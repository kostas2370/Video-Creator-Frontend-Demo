import "../App.css";
import React, { useState, useEffect } from "react";
import FormComponent from "./form_component";
import AvatarFormComponent from "./avatar_creation_component";
import VideoResultComponent from "./video_results_component";
import { request } from "./apicalls";

export default function Home() {
  const [options, setOptions] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [voiceOptions, setVoiceOptions] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      const opti = await request("templates/");
      setOptions(opti);
      const avatat_options = await request("avatars/");
      setAvatar(avatat_options);
      const voices = await request("voices/");
      setVoiceOptions(voices);
    };

    fetchOptions();
  }, []);

  return (
    <center>
      <table className="back">
        <tbody>
          <tr>
            <td>
              <center>
                <h3>Avatar Creation</h3>
              </center>
              <AvatarFormComponent
                voiceOptions={voiceOptions}
              ></AvatarFormComponent>
            </td>
            <td>
              <center>
                <h3>Video Generation</h3>
              </center>
              <FormComponent options={options} avatar={avatar}></FormComponent>
            </td>
            <td>
              <center>
                <h3 >Previous Results</h3>
                {""}
              </center>
              <VideoResultComponent></VideoResultComponent>
            </td>
          </tr>
        </tbody>
      </table>
    </center>
  );
}

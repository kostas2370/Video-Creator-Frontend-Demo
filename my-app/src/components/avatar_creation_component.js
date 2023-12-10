import React, { useState } from "react";
import axios from "axios";

const AvatarFormComponent = (props) => {
  const [name, setName] = useState("");
  const [voice, setVoice] = useState("");
  const [gender, setGender] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tempImageurl, setTempImageurl] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("file", selectedFile);
    formData.append("voice", voice);
    formData.append("gender", gender);
    if (!name) {
      alert("You must add name");
      return;
    }
    if (!gender) {
      alert("You must add gender");
      return;
    }

    setLoading(true);
    axios
      .post("http://localhost:8000/api/avatars/", formData)
      .then((response) => {
        setLoading(false);
        setName("");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="my-form" id="avatarform">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
      </div>

      <label htmlFor="voice">Voice:</label>
      {!props.voiceOptions ? (
        <p>Loading...</p>
      ) : (
        <select
          id="voice"
          onChange={(e) => setVoice(e.target.value)}
          name="voice"
        >
          <option key="No voice" value="">
            Select a voice
          </option>
          {props.voiceOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.id}
            </option>
          ))}
        </select>
      )}

      <label htmlFor="gender">Gender:</label>
      <select
        id="gender"
        onChange={(e) => setGender(e.target.value)}
        name="gender"
      >
        <option key="male" value="male">
          Male
        </option>
        <option key="female" value="female">
          Female
        </option>
      </select>

      <div className="form-group">
        <label htmlFor="file">Image :</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
            setTempImageurl(URL.createObjectURL(e.target.files[0]));
          }}
        ></input>
      </div>

      {!voice ? (
        <p></p>
      ) : (
        <ul>
          <li>
            {props.voiceOptions.map((item, index) => {
              if (voice === item.id.toString()) {
                return (
                  <div>
                    <p>Voice with id :{item.id}</p>
                    <audio controls>
                      <source src={item.sample} />
                    </audio>
                  </div>
                );
              }
              return null
            })}
          </li>
        </ul>
      )}

      {!selectedFile ? (
        <p></p>
      ) : (
        <div>
          <image src={tempImageurl} />
        </div>
      )}

      {!loading ? (
        <center>
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </center>
      ) : (
        <center>
          <p>Waiting</p>
        </center>
      )}
    </form>
  );
};

export default AvatarFormComponent;
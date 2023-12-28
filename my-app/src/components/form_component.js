import React, { useState, useEffect } from "react";
import axios from "axios";
import { request } from "./apicalls";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    template_id: "general",
    title: "",
    avatar_selection: "no_avatar",
    message: "",
    target_audience:"",
    images: "webscrap",
    gpt_model: "gpt-4",
    style: "natural",
    music:""
  });

  const [loading, setLoading] = useState(false);
  const [selectedAvatar, setSectedAvatar] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [hide, setHide] = useState(false);


  useEffect(() => {
    const fetchOptions = async () => {
     
      const avatat_options = await request("avatars/");
      setAvatar(avatat_options);
    };

    fetchOptions();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });

    if (name === "avatar_selection") {
      setSectedAvatar(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.title) {
      alert("You must add title");
      return;
    }

    if (!formData.message) {
      alert("You must add a message");
      return;
    }
    formData.avatar = false;

   
    setLoading(true);
    alert(
      "Thank you for submiting the prompt, if everything is fine , you can see the video in video Results soon"
    );
    event.target.reset();

    axios
      .post("http://localhost:8000/api/generate/", formData)
      .then((response) => {setLoading(false); alert("You can check your video in The videos tab")});
  };

  const hideClick = (event) => {
    event.preventDefault();
    if (hide) {
      setHide(false)
    }else{
      setHide(true)
    }

  }

  return (
    <form onSubmit={handleSubmit} className="my-form selected_avatar">
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Prompt:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          className="form-control"
        ></textarea>
      </div>

      <hr></hr>
      {hide ? (<></>) : (<>
        <div className="form-group">
        <label htmlFor="target_audience" placeholder="text">Audience:</label>
        <input
          type="text"
          id="target_audience"
          name="target_audience"
          value={formData.target_audience}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      

      <label htmlFor="category">Genre:</label>
      <input
          type="text"
          id="category"
          name="category"

          onChange={handleInputChange}
          className="form-control"
        />
      <div className="form-group">
        <label htmlFor="avatar">Avatar:</label>
        {!avatar ? (
          <p>Loading...</p>
        ) : (
          <select
            id="avatar"
            onChange={handleInputChange}
            name="avatar_selection"
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
      </div>
      <label htmlFor="images">Image Mode:</label>

      <select id="images" onChange={handleInputChange} name="images">
        <option key="webscrap" value="webscrap">
          Web
        </option>
        <option key="AI" value="AI">
          DALL E
        </option>

      </select>
      {formData.images == "AI" ? (<><label htmlFor="style">Image Style</label>   
      <select id="style" onChange={handleInputChange} name="style">
        <option key="vivid" value="vivid">
        vivid
        </option>
        <option key="natural" value="natural">
          natural
        </option>
      </select></>) : (<></>)}
      
      
      </>)}
      
      
      <div className="form-group">
        <label htmlFor="music" placeholder="text">Music:</label>
        <input
          type="text"
          id="music"
          name="music"
          value={formData.music}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      

      {!selectedAvatar ? (
        <p></p>
      ) : (
        <ul>
          {avatar.map((item, index) => {
            if (formData.avatar_selection === item.id.toString()) {
              return (
                <center>
                  <div>
                    <p>Avatar with id :{item.id}</p>

                    <img
                      src={item.file}
                      className="selected-avatar"
                      alt="Avatar"
                    />
                  </div>
                  <audio controls>
                    <source src={item.voice.sample} />
                  </audio>
                </center>
              );
            }
            return null;
          })}
        </ul>
      )}

      {!loading ? (
        <center>
          <button type="submit" className="btn-submit">
            Create Video
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

export default FormComponent;

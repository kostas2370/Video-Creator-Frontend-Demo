import React, { useState } from "react";
import axios from "axios";

const FormComponent = (props) => {
  const [formData, setFormData] = useState({
    template_id: "",
    title: "",
    avatar_selection: "",
    message: "",
    avatar: "",
    images: "webscrap",
    gpt_model:"gpt-4"

   
  });


  const [loading, setLoading] = useState(false);
  const [selectedAvatar, setSectedAvatar] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  

    setFormData({ ...formData, [name]: value });

    if (name==="avatar_selection"){
      setSectedAvatar(value)

    }
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.title) {
      alert("You must add title");
      return;
    }

    if (!formData.template_id) {
      alert("You must add category");
      return;
    }

    if (!formData.message) {
      alert("You must add a message");
      return;
    }
    formData.avatar = false;

    if (formData.avatar_selection) {
      formData.avatar = true;
    }

    setLoading(true);
    alert("Thank you for submiting the prompt, if everything is fine , you can see the video in video Results soon")
    event.target.reset()

    axios.post("http://localhost:8000/api/test/", formData).then((response) => {
    });
  };

  

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

      <label htmlFor="category">Category:</label>
      {!props.options ? (
        <p>Loading...</p>
      ) : (
        <select id="category" onChange={handleInputChange} name="template_id">
          <option key="Select a category" value="">
            Select a category
          </option>
          {props.options.map((option) => (
            <option key={option.title} value={parseInt(option.id)}>
              {option.title}
            </option>
          ))}
        </select>
      )}

      <div className="form-group">
        <label htmlFor="avatar">Avatar:</label>
        {!props.avatar ? (
          <p>Loading...</p>
        ) : (
          <select
            id="avatar"
            onChange={handleInputChange}
            name="avatar_selection"
          >
            <option key="No avatar" value="">
              No Avatar
            </option>
            {props.avatar.map((avatar) => (
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
              webscrap
            </option>
            <option key="AI" value="AI">
              AI
            </option>
        </select>


      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          className="form-control"
        ></textarea>
      </div>


      {!selectedAvatar ? (
        <p></p>
      ) : (
        <ul>
          
            {props.avatar.map((item, index) => {
              if (formData.avatar_selection === item.id.toString()) {
                return (
                  
                  <center><div>
                    <p>Avatar with id :{item.id}</p>

                    <img src ={item.file} className="selected-avatar" alt="Avatar"/>
                    <audio controls>
                      <source src={item.voice.sample} />
                    </audio>
                  </div>
                  </center>
                );
              }
              return null
            })}
         
        </ul>
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

export default FormComponent;

import React, { useState, useEffect } from "react";


function Dropbox({label ,value_list,setSelectedValue ,selected_value, update_func}) {
  return (
    <>
      {!value_list ? (
        <></>
      ) : (
        <>
        <form onSubmit={update_func} className="fullvidform">
                <span className="title-label">{label}</span>
                {!value_list ? (
                  <p>Loading...</p>
                ) : (
                  <>
                  <select
                    id="intro"
                    onChange={(e) => setSelectedValue(e.target.value)}
                    name="intro_selection"
                    value={selected_value}
                  >
                    <option key="No Intro" value="no_value">
                      No {label}
                    </option>
                    {value_list.map((item) => (
                      <option key={item.name} value={parseInt(item.id)}>
                        {item.name}
                      </option>
                    ))}
                  </select>

                  </>
                )}

                <button className="btn-sub" type="submit">
                  Update
                </button>
                </form>
        </>
      )}
    </>
  );
}

export default Dropbox;
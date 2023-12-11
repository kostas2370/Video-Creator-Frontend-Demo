import "../App.css";
import React from "react";
import FormComponent from "./form_component";

export default function Home() {

 
  return (
    <center>
      <table className="back">
        <tbody>
          <tr>
  
            <td>
              <center>
                <h3>Video Generation</h3>
              </center>
              <FormComponent></FormComponent>
            </td>
          
          </tr>
        </tbody>
      </table>
    </center>
  );
}

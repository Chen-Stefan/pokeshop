import React from "react";
import twitter from "../assets/images/twitter.png";
import facebook from "../assets/images/facebook.png";
import instagram from "../assets/images/instagram.png";

export default function Footer() {
  return (
    <div style = {{ bottom: 0, width: '100%', textAlign: 'center'}}>
      <h6>Copyright &copy; Stefan's Pokemon Shop 2022</h6>
      <div>
        <img src={twitter} alt="twitter" width="50px" height="50px" />
        <img src={facebook} alt="facebook" width="50px" height="50px" />
        <img src={instagram} alt="instagram" width="50px" height="50px" />
      </div>
    </div>
  );
}

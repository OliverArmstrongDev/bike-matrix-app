import React from "react";
import "./Footer.css";

interface Props {}

const Footer = (props: Props) => {
  return (
    <footer>
      <div className="footer-content">{`© Copyright ${new Date().getFullYear()}`}</div>
    </footer>
  );
};

export default Footer;

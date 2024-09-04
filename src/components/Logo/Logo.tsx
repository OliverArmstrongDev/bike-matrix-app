import "./Logo.css";
import image from "../../assets/images/Bike-Matrix-Logo.webp";

const Logo = () => {
  return (
    <div className="logo-container">
      <a href="/">
        <img className="logo-img" src={image} />
      </a>
    </div>
  );
};

export default Logo;

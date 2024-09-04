import "./Image.css";
import image from "../../assets/images/bicycle-placeholder.png";

const Image = () => {
  return (
    <div className="image-container">
      <a href="/">
        <img className="image-img" src={image} />
      </a>
    </div>
  );
};

export default Image;

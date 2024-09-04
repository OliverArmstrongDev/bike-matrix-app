import Button from "../primary/Button";
import { IconType } from "react-icons";
import "./SidebarButton.css";

interface ButtonProps {
  buttonText: string;
  IconName?: IconType;
}

const SidebarButton = ({ buttonText, IconName }: ButtonProps) => {
  return (
    <div className="sidebar-button-container">
      <button className="sidebar-button">
      {IconName && <IconName size={20} className="sidebar-button-icon" />}
      {buttonText}
    </button>
    </div>
  );
};

export default SidebarButton;

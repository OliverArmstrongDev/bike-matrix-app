import "./Button.css";
import { IconType } from "react-icons";

interface ButtonProps {
  buttonText: string;
  IconName?: IconType;
  onButtonClick: (e: any) => any;
  buttonType?:  "button" | "submit" | "reset" | undefined;
  buttonStyles?: any
}

const Button = ({ buttonText, IconName, onButtonClick, buttonStyles, buttonType='button'}: ButtonProps) => {
  return (
      <button style={{...buttonStyles}} type={buttonType} className="primary-button" onClick={(e) => onButtonClick(e)}>
      {IconName && <IconName size={20} className="primary-button-icon" />}
        {buttonText}
      </button>
  );
};

export default Button;

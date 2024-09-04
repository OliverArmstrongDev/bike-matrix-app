import "./MobileMenu.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

interface MobileMenuProps {
  onMenuIconClick: React.MouseEventHandler<HTMLDivElement>
  showMobileMenu: Boolean
}

const MobileMenu = ({onMenuIconClick, showMobileMenu}: MobileMenuProps) => {
  return (
    <div className="mobile-nav" onClick={onMenuIconClick}>
    {showMobileMenu ? (
      <AiOutlineClose size={24} className="burger-close" />
    ) : (
      <AiOutlineMenu size={24} className="burger-open" />
    )}
  </div>
  );
};

export default MobileMenu;

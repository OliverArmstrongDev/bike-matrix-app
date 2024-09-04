import React from "react";
import "./Sidebar.css";
import { AiOutlineBars, AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import SidebarButton from "../../components/Buttons/sidebar/SidebarButton";
import { useApp } from "../../hooks/useApp";

interface Props {
  children?: string;
}

const Sidebar: React.FC<Props> = ({ children }) => {
  const {setShowMobileMenu} = useApp();

  return (
    <div className="sidebar-content">
      <Link style={{ textDecoration: 'none' }} to="/" onClick={()=>setShowMobileMenu(false)}><SidebarButton IconName={AiOutlineBars} buttonText={"My Bikes"}/></Link>
      <Link style={{ textDecoration: 'none' }} to="/add" onClick={()=>setShowMobileMenu(false)}><SidebarButton IconName={AiFillPlusCircle} buttonText={"Add New Bike"}/></Link>
    </div>
  );
};

export default Sidebar;

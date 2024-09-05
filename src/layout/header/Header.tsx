import React, { useEffect, useState } from 'react'
import "./Header.css"
import MobileMenu from '../../components/MobileMenu/MobileMenu';
import { useBike } from '../../hooks/useBike';
import { useApp } from '../../hooks/useApp';


interface Props {
  headerRight?: React.ReactNode;
  headerLeft: React.ReactNode;
}

const Header:React.FC<Props> = ({headerRight, headerLeft}) => {
  const [rightContent, setRightContent] = useState<String>("");
  const {setShowMobileMenu, showMobileMenu, error, loading} = useApp();
  
  const handleMobileMenuClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setShowMobileMenu(!showMobileMenu);
    
  };
  useEffect(() => {
    setRightContent(error.length ? error : loading ? "Loading..." : "")
  }, [error, loading])
  
  return (
    <header className="header-container">
        {/* mobile nav */}
        <MobileMenu onMenuIconClick={handleMobileMenuClick} showMobileMenu={showMobileMenu} />
        {/* desktop header left */}
        <div className="header-left">{headerLeft}</div>
        {/* desktop header right */}
        <div className="header-right">{rightContent}</div>
      </header>
        )
}

export default Header
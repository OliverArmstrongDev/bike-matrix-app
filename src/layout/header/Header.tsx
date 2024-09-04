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
  // const [showMobileMenu, setShowMobileMenu] = useState<Boolean>(false);
  const {error} = useBike();
  const {setShowMobileMenu, showMobileMenu} = useApp();

  const handleMobileMenuClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setShowMobileMenu(!showMobileMenu);
    
  };
  
  return (
    <header className="header-container">
        {/* mobile nav */}
        <MobileMenu onMenuIconClick={handleMobileMenuClick} showMobileMenu={showMobileMenu} />
        {/* desktop header left */}
        <div className="header-left">{headerLeft}</div>
        {/* desktop header right */}
        <div className="header-right">{typeof error === 'string' ? error : ""}</div>
      </header>
        )
}

export default Header
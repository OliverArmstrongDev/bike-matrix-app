import React from "react";
import "./Layout.css";
import Header from "./header/Header";
import Logo from "../components/Logo/Logo";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FormContextProvider } from "../contexts/FormContext";
import { BikeContextProvider } from "../contexts/BikeContext";
import { AppContextProvider } from "../contexts/AppContext";


interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
}: LayoutWrapperProps) => {
  return (
    <BikeContextProvider>
      <FormContextProvider>
    <AppContextProvider>
        <BrowserRouter>
          <div className="layout-wrapper-container">
            {/* Header */}
            <Header headerLeft={<Logo />} />
            {/* Sidebar */}
            <div className="sidebar">{<Sidebar />}</div>
            {/* Main content */}
            <main className="layout-content-container">{children}</main>
            {/* Footer */}
            {<Footer />}
          </div>
        </BrowserRouter>
    </AppContextProvider>
      </FormContextProvider>
    </BikeContextProvider>
  );
};
export default LayoutWrapper;

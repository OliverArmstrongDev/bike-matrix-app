import React, { createContext, useEffect, useReducer } from "react";
import { IUser } from "../models/User";
import { useData } from "../hooks/useData";
import { useBike } from "../hooks/useBike";

export interface IAppState {
  user           : {};
  isAuthenticated: boolean;
  showMobileMenu : boolean;
  error          : string;
  loading        : boolean;
}
export enum appActionType {
  LOGIN     = "login",
  LOGOUT    = "logout",
  SIGNUP    = "signup",
  SHOW_MENU = "show_menu",
  ERROR     = "error",
  LOADING   = "loading",
}

type AppContextType = {
  appDispatch: React.Dispatch<any>;
  user: IUser | {};
  isAuthenticated: boolean;
  appActionType: typeof appActionType;
  showMobileMenu: boolean;
  setShowMobileMenu: (value: boolean) => void;
  error: string;
  loading: boolean;
};

const initialAuthState: IAppState = {
  user           : {},
  isAuthenticated: false,
  showMobileMenu : false,
  error          : "",
  loading        : false,
};

export const AppContext = createContext<AppContextType | null>(null);

export const appReducer = (appState: IAppState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    // NOT IN USE -- >
    case appActionType.LOGIN:
      return { ...appState, user: { ...payload } };
    case appActionType.LOGOUT:
      return { ...appState, user: null };
    //  -->
    case appActionType.SHOW_MENU:
      return { ...appState, showMobileMenu: payload };
    case appActionType.ERROR:
      return { ...appState, error: payload };
    case appActionType.LOADING:
      return { ...appState, loading: payload };
    default:
      return appState;
  }
};

export const AppContextProvider = (prop: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [appState, appDispatch] = useReducer(appReducer, initialAuthState);
  const { error, loading } = useData();

  useEffect(() => {
    appDispatch({ type: appActionType.LOADING, payload: loading });

    if (error?.message !== "") {
      appDispatch({ type: appActionType.ERROR, payload: error?.message });
    }
  }, [error, loading]);

  const setShowMobileMenu = (value: boolean) => {
    appDispatch({ type: appActionType.SHOW_MENU, payload: value });
    const sidebar = document.querySelector(".sidebar") as HTMLDivElement;
    sidebar.classList.toggle("open");
  };

  return (
    <AppContext.Provider
      value={{ ...appState, appDispatch, setShowMobileMenu, appActionType }}
    >
      {prop.children}
    </AppContext.Provider>
  );
};

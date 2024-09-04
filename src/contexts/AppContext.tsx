import React, { createContext, useEffect, useReducer } from "react";
import { IUser } from "../models/User";
import { useData } from "../hooks/useData";
import { useBike } from "../hooks/useBike";

export interface IAppState {
  user: {};
  isAuthenticated: boolean;
  showMobileMenu: boolean;
}
export enum appActionType {
  LOGIN     = "login",
  LOGOUT    = "logout",
  SIGNUP    = "signup",
  SHOW_MENU = "show_menu",
  ERROR     = "error",
}

type AppContextType = {
  appDispatch: React.Dispatch<any>;
  user: IUser | {};
  isAuthenticated: boolean;
  appActionType: typeof appActionType;
  showMobileMenu: boolean;
  setShowMobileMenu: (value: boolean) => void;
};

const initialAuthState: IAppState = {
  user: {},
  isAuthenticated: false,
  showMobileMenu: false,
};

export const AppContext = createContext<AppContextType | null>(null);

export const authReducer = (appState: IAppState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case appActionType.SHOW_MENU:
      return { ...appState, showMobileMenu: payload };
    case appActionType.LOGIN:
      return { ...appState, user: { ...payload } };
    case appActionType.LOGOUT:
      return { ...appState, user: null };
    default:
      return appState;
  }
};

export const AppContextProvider = (prop: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [appState, appDispatch] = useReducer(authReducer, initialAuthState);
  const {
    fetchLoggedInUser,
    setToken,
    authError,
    authData,
    token,
    saveError,
    fetchError,
    data,
  } = useData();
  const { bikeDispatch, bikeActionType } = useBike();

  useEffect(() => {
    if (authData) {
      appDispatch({ type: appActionType.LOGIN, payload: authData });
    }
    if (authError) {
      appDispatch({ type: appActionType.ERROR, payload: authError });
    }
    if (data) {
      bikeDispatch({ type: bikeActionType.SET_ALL, payload: data });
    }
    if (saveError || fetchError) {
      bikeDispatch({
        type: bikeActionType.SET_ERROR,
        payload: saveError || fetchError,
      });
    }
  }, [authData, authError]);

  useEffect(() => {
    setToken(appState?.user?.token);
    const getSetToken = () => {
      fetchLoggedInUser();
    };
    token?.length && getSetToken();
  }, [token]);

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

import React, { createContext, useEffect, useReducer } from "react";
import { useData } from "../hooks/useData";
import { IBike } from "../models/Bike";

export interface IBikeState {
  bikes: [];
  error: string;
}

export enum bikeActionType {
  SAVE_NEW  = "save_new",
  UPDATE    = "update",
  SET_ALL   = "set_all",
  SET_ERROR = "set_error",
}

type BikeContextType = {
  bikeDispatch  : React.Dispatch<any>;
  editBike      : any;
  saveBike      : any;
  deleteBike    : any;
  bikes         : IBike[];
  error         : string;
  bikeActionType: typeof bikeActionType;
};

const InitialBikeState: IBikeState = {
  bikes: [],
  error: ""
};

export const BikeContext = createContext<BikeContextType | null>(null);

const BikeReducer = (state: IBikeState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case bikeActionType.SAVE_NEW:
      return { ...state, bikes: [...state.bikes, payload] };
    case bikeActionType.UPDATE:
      const updatedBikes = state.bikes.filter((bike: IBike)=> bike._id !== payload?._id);
      return { ...state, bikes: [...updatedBikes, payload] };
    case bikeActionType.SET_ALL:
      return { ...state, bikes: payload };
    case bikeActionType.SET_ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
};
export const BikeContextProvider = (prop: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [bikeState, bikeDispatch] = useReducer(BikeReducer, InitialBikeState);
  const { saveBike, editBike, deleteBike, saving, saveError, deleteError, data } = useData();

  useEffect(() => {
    if (data) {
      if(Array.isArray(data)){
        bikeDispatch({ type: bikeActionType.SET_ALL, payload: data });
        return;
      }
      const actionType = data.edited ? bikeActionType.UPDATE : bikeActionType.SAVE_NEW;
      let updatedBike = data;
      bikeDispatch({ type: actionType, payload: updatedBike });
    }
    if (saveError || deleteError) {
      bikeDispatch({ type: bikeActionType.SET_ERROR, payload: saveError || deleteError });
    }
  }, [data, deleteError, saveError]);

  return (
    <BikeContext.Provider
      value={{ ...bikeState, bikeDispatch, deleteBike, editBike, saveBike, bikeActionType }}
    >
      {prop.children}
    </BikeContext.Provider>
  );
};

import React, { createContext, useEffect, useReducer} from 'react'

export interface IFormState {
    brand    : string;
    modelName: string;
    year     : string;
    image    : string;
  }
  
  export enum formActionType {
    SET_VALUES = "set_values",
    CLEAR_ALL  = "clear_all",
  }

  type FormContextType = {
    formState: IFormState;
    formDispatch: React.Dispatch<any>;
    formActionType: typeof formActionType
  };
   
  
  const initialFormState: IFormState = {
    brand    : "",
    modelName: "",
    year     : "",
    image    : "./",
  }

export const FormContext = createContext<FormContextType | null>(null);

const formReducer = (state: IFormState, action: any) => {
  const { type, payload } = action;
switch (type){
    case formActionType.SET_VALUES:
      return {...state, ...payload}
    case formActionType.CLEAR_ALL:
      return initialFormState
        default:
            return state;
    }
}
export const FormContextProvider = (prop:{ children: JSX.Element | JSX.Element[]})=> {
    const [formState, formDispatch] = useReducer(formReducer, initialFormState);

  return (
    <FormContext.Provider value={{formState, formDispatch, formActionType}}>
        {prop.children}
    </FormContext.Provider>
  )
}
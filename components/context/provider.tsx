"use client";

import { ReactNode, useReducer, useEffect } from "react";
import { GlobalReducer, Action } from "./reducer";
import { IChangePasswordDTO, IInitialState, IModal, IRequest, IUser } from "./types";
import { GlobalContext, InitialState } from "./context";

export default function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(GlobalReducer, InitialState);

  const setModal = (payload: IModal | null) => {
    return dispatch({ type: Action.SET_MODAL, payload });
  };

  const setRequest = (payload: IRequest[] | null) => {
    return dispatch({ type: Action.SET_REQUEST, payload });
  };

  const setBalance = (payload: number) => {
    return dispatch({ type: Action.SET_BALANCE, payload });
  };

  const setData = (payload: IInitialState) => {
    return dispatch({ type: Action.SET_DATA, payload });
  };

  const registerUser = (payload: IUser) => {
    return dispatch({ type: Action.REGISTER_USER, payload });
  };

  const setCurrentUser = (payload: IUser | null) => {
    return dispatch({ type: Action.SET_CURRENT_USER, payload });
  };

  const saveDataToDB = () => {
    localStorage.setItem("state", JSON.stringify(state));
  };

  const getDataFromDB = () => {
    const data: IInitialState = localStorage.getItem("state")
      ? JSON.parse(localStorage.getItem("state")!)
      : null;

    data && setData(data);
  };

  const findUser = (email: string) => {
    if (state.registered_users.length === 0) {
      return undefined;
    } else return state.registered_users.find((user) => user.email === email);
  };

  const changePassword = (payload: IChangePasswordDTO) => {
    return dispatch({ type: Action.CHANGE_PASSWORD, payload });
  };

  useEffect(() => getDataFromDB(), []);
  useEffect(() => saveDataToDB(), [state]);

  console.log(state.current_user);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        findUser,
        setModal,
        setBalance,
        setRequest,
        registerUser,
        setCurrentUser,
        changePassword,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

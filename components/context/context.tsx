"use client";

import { IContext, IInitialState } from "./types";
import { createContext, useContext } from "react";

export const InitialState: IInitialState = {
  modal: null,
  registered_users: [],
  current_user: null,
};

export const context: IContext = {
  state: InitialState,
  dispatch: () => null,
  setModal: () => null,
  setBalance: () => null,
  setRequest: () => null,
  registerUser: () => null,
  findUser: () => undefined,
  setCurrentUser: () => null,
  changePassword: () => null,
};

export const GlobalContext = createContext(context);

export const useGlobalContext = () => useContext(GlobalContext);

import { Dispatch } from "react";
import { Payload } from "./reducer";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

export interface IInitialState {
  modal: IModal | null;
  registered_users: IUser[];
  current_user: IUser | null;
}

export interface IUser {
  [key: string]: any;
  email: string;
  password: string;
  password_repeat?: string;
  name: string;
  image: string;
  requests: IRequest[] | null;
  balance: number;
}

export interface IContext {
  state: IInitialState;
  dispatch: Dispatch<Actions>;
  setModal: (payload: IModal | null) => void;
  findUser: (payload: string) => IUser | undefined;
  setBalance: (payload: number) => void;
  setRequest: (payload: IRequest[] | null) => void;
  registerUser: (payload: IUser) => void;
  setCurrentUser: (payload: IUser | null) => void;
  changePassword: (payload: IChangePasswordDTO) => void;
}

export interface IRequest {
  name: string;
  title: string;
  description: string;
  priority: number;
  price: number;
}

export enum ModalType {
  USER_CARD = "USER_CARD",
  CALL_BACK = "CALL_BACK",
  CREATE_REQUEST_FORM = "CREATE_REQUEST_FORM",
}

export interface IModal {
  type: ModalType;
  data?: any;
}

export interface IChangePasswordDTO {
  user: IUser;
  password: string;
}

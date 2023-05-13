import {
  IUser,
  IModal,
  Actions,
  IInitialState,
  IChangePasswordDTO,
} from "./types";

export enum Action {
  SET_DATA = "SET_DATA",
  SET_MODAL = "SET_MODAL",
  REGISTER_USER = "REGISTER_USER",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
  CHANGE_USER_DATA = "CHANGE_USER_DATA",
  SET_CURRENT_USER_EMAIL = "SET_CURRENT_USER_EMAIL",
}

export interface Payload {
  [Action.SET_DATA]: IInitialState;
  [Action.SET_MODAL]: IModal | null;
  [Action.REGISTER_USER]: IUser;
  [Action.CHANGE_PASSWORD]: IChangePasswordDTO;
  [Action.CHANGE_USER_DATA]: Partial<IUser>;
  [Action.SET_CURRENT_USER_EMAIL]: string | null;
}

export const GlobalReducer = (
  state: IInitialState,
  action: Actions
): IInitialState => {
  switch (action.type) {
    case Action.SET_MODAL:
      return { ...state, modal: action.payload };

    case Action.SET_DATA:
      return { ...action.payload };

    case Action.REGISTER_USER:
      return {
        ...state,
        registered_users: state.registered_users
          ? [...state.registered_users, action.payload]
          : [action.payload],
      };

    case Action.SET_CURRENT_USER_EMAIL:
      return { ...state, current_user_email: action.payload };

    case Action.CHANGE_USER_DATA:
      const registered_users = (
        structuredClone(state.registered_users) as IUser[]
      ).map((user) => {
        if (user.email === state.current_user_email) {
          return { ...user, ...action.payload };
        } else return user;
      });

      return { ...state, registered_users };

    default:
      return state;
  }
};

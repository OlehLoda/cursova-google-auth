import { Actions, IChangePasswordDTO, IInitialState, IModal, IRequest, IUser } from "./types";

export enum Action {
  SET_DATA = "SET_DATA",
  SET_MODAL = "SET_MODAL",
  SET_REQUEST = "SET_REQUEST",
  SET_BALANCE = "SET_BALANCE",
  REGISTER_USER = "REGISTER_USER",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
  SET_CURRENT_USER = "SET_CURRENT_USER",
}

export interface Payload {
  [Action.SET_DATA]: IInitialState;
  [Action.SET_MODAL]: IModal | null;
  [Action.SET_REQUEST]: IRequest[] | null;
  [Action.SET_BALANCE]: number;
  [Action.REGISTER_USER]: IUser;
  [Action.CHANGE_PASSWORD]: IChangePasswordDTO;
  [Action.SET_CURRENT_USER]: IUser | null;
}

export const GlobalReducer = (state: IInitialState, action: Actions): IInitialState => {
  switch (action.type) {
    case Action.SET_BALANCE:
      return state.current_user
        ? {
            ...state,
            current_user: {
              ...state.current_user,
              balance: action.payload,
            },
          }
        : { ...state };

    case Action.SET_REQUEST:
      return state.current_user
        ? {
            ...state,
            current_user: {
              ...state.current_user,
              requests: action.payload,
            },
          }
        : { ...state };

    case Action.SET_MODAL:
      return { ...state, modal: action.payload };

    case Action.SET_DATA:
      return { ...action.payload };

    case Action.REGISTER_USER:
      return {
        ...state,
        registered_users:
          state.registered_users?.length > 0
            ? [...state.registered_users, action.payload]
            : [action.payload],
        current_user: action.payload,
      };

    case Action.SET_CURRENT_USER:
      return {
        ...state,
        current_user: action.payload,
      };

    case Action.CHANGE_PASSWORD:
      console.log(action.payload);

      return {
        ...state,
        registered_users: [
          ...state.registered_users.map((user) => {
            if (user === action.payload.user) {
              return {
                ...user,
                password: action.payload.password,
                password_repeat: action.payload.password,
              };
            } else return user;
          }),
        ],
      };

    default:
      return { ...state };
  }
};

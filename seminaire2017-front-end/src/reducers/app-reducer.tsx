// import { START_WAITING, STOP_WAITING, SET_NAV_INDEX } from "./../actions/app-actions";
import { ActionsTypes } from "./../actions/action-types";
import { TypeKeys } from "./../actions/app-actions";

export type AppState = {
  waiting: boolean;
  navIndex: number;
};

const initial: AppState = {
  waiting: false,
  navIndex: 1
};

export default (state = initial, action: ActionsTypes) => {
  switch (action.type) {
    case TypeKeys.setNavIndex: {
      return { ...state, navIndex: action.index };
    }
    case TypeKeys.startWaiting: {
      return { ...state, waiting: true };
    }
    case TypeKeys.stopWaiting: {
      return { ...state, waiting: false };
    }
    default:
      return state;
  }
};

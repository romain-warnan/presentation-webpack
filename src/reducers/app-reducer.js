import { START_WAITING, STOP_WAITING, SET_NAV_INDEX } from "./../actions/app-actions";

const initial = {
  waiting: false,
  navIndex: 1
};

export default (state = initial, action) => {
  switch (action.type) {
    case SET_NAV_INDEX: {
      return { ...state, navIndex: action.index };
    }
    case START_WAITING: {
      return { ...state, waiting: true };
    }
    case STOP_WAITING: {
      return { ...state, waiting: false };
    }
    default:
      return state;
  }
};

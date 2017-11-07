import { START_WAITING, STOP_WAITING } from "./../actions/app-actions";

const initial = {
  waiting: false
};

export default (state = initial, action) => {
  switch (action.type) {
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

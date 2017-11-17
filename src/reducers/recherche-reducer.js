import { NOUVELLE_RECHERCHE } from "./../actions/recherche-actions";

const initial = {
  q: ""
};

export default (state = initial, action) => {
  switch (action.type) {
    case NOUVELLE_RECHERCHE: {
      const { q } = action;
      return { ...state, q };
    }
    default:
      return state;
  }
};

export const START_WAITING = "__START_WAITING__";
export const STOP_WAITING = "__STOP_WAITING__";
export const SET_NAV_INDEX = "__SET_NAV_INDEX__";

export const startWaiting = () => ({ type: START_WAITING });
export const stopWaiting = () => ({ type: STOP_WAITING });
export const setNavIndex = index => ({ type: SET_NAV_INDEX, index });

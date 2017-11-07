export const START_WAITING = "__START_WAITING__";
export const STOP_WAITING = "__STOP_WAITING__";

export const startWaiting = () => ({ type: START_WAITING });
export const stopWaiting = () => ({ type: STOP_WAITING });

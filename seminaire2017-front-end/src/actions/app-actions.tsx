export enum TypeKeys {
  startWaiting = "app/startWaiting",
  stopWaiting = "app/stopWaiting",
  setNavIndex = "app/setNavIndex"
}

export interface StartWaitingAction {
  type: TypeKeys.startWaiting;
}
export interface StopWaitingWaitingAction {
  type: TypeKeys.stopWaiting;
}
export interface SetNavIndexWaitingAction {
  type: TypeKeys.setNavIndex;
  index: number;
}

export const startWaiting = () => ({ type: TypeKeys.startWaiting });
export const stopWaiting = () => ({ type: TypeKeys.stopWaiting });
export const setNavIndex = (index: number) => ({ type: TypeKeys.setNavIndex, index });

import { StateNameType } from "../stateControllers/states/type/type";
import { Observable } from "./observable";

export type TailDataType = {
  newState: StateNameType;
  prevState: StateNameType;
  id: string;
  around: number | undefined;
};

class TailStateObservable extends Observable<TailDataType> {}

export const tailStateObservable = new TailStateObservable();

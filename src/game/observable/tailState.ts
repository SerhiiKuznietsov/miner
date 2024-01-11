import { StateNameType } from "../stateControllers/states/type/type";
import { Observable } from "./observable";

export type DataType = { newState: StateNameType, prevState: StateNameType, id: string, around: number | undefined };

class TailStateObservable extends Observable<DataType> {}

export const tailStateObservable = new TailStateObservable();

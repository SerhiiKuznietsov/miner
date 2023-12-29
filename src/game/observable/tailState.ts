import { StateNameType } from "../stateControllers/states/type/type";
import { Observable } from "./observable";

export type DataType = [StateNameType, string, number?];

class TailStateObservable extends Observable<DataType> {}

export const tailStateObservable = new TailStateObservable();

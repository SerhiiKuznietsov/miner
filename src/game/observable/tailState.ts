import { StateName } from "../states/type/type";
import { Observable } from "./observable";

export type DataType = [StateName, string, number?];

class TailStateObservable extends Observable<DataType> {}

export const tailStateObservable = new TailStateObservable();

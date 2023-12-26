import { StateName } from "../states/type/type";
import { Observable } from "./observable";

type DataType = [StateName, string, number?];

class TailStateObservable extends Observable<StateName, DataType> {}

export const tailStateObservable = new TailStateObservable();

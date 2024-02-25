import { StateNameType } from "../stateControllers/type/type";
import { Observable } from "./observable";

export type TileDataType = {
  newState: StateNameType;
  prevState: StateNameType;
  id: string;
  around: number | undefined;
};

class TileStateObservable extends Observable<TileDataType> {}

export const tileStateObservable = new TileStateObservable();

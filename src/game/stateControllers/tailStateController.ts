import { ActionName } from "../actions/actions";
import { StateNameType } from "./states/type/type";
import { StateController } from "./stateController";

export class TailStateController extends StateController<
  StateNameType,
  ActionName
> {}

import { ActionName } from "../../actions/actions";
import { StateController } from "../stateController";
import { StateNameType } from "../states/type/type";

export class TailStateController extends StateController<
  StateNameType,
  ActionName
> { }
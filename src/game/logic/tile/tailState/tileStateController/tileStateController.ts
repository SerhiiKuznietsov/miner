import { StateController } from "../../../../services/stateControllers/stateController";
import {
  ActionName,
  StateNameType,
} from "../../../../services/stateControllers/type/type";

export class TileStateController extends StateController<
  StateNameType,
  ActionName
> {}

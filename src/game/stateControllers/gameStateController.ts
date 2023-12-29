import { GameActionNameType, GameStateType } from "./states/type/type";
import { StateController } from "./stateController";

export class GameStateController extends StateController<
  GameStateType,
  GameActionNameType
> {}

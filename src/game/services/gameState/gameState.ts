import { State } from "../stateControllers/states/state";
import {
  GameActionNameType,
  GameStateType,
} from "../stateControllers/type/type";

export class GameState extends State<GameStateType, GameActionNameType> {}

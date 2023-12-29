import { GameStateType } from "../stateControllers/states/type/type";
import { Observable } from "./observable";

class GameObserver extends Observable<GameStateType> {}

export const gameObserver = new GameObserver();

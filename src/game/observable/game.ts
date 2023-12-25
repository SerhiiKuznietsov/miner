import { Observable } from "./observable";

type gameActions = "start" | "win" | "lose";

class GameObserver extends Observable<gameActions, any> {}

export const gameObserver = new GameObserver();

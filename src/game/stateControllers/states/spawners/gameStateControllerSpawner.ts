import { spawnStateController } from ".";
import { GameStateController } from "../../gameStateController";
import {
  GameStateType,
  GameActionNameType,
  GameStateList,
  GameAction,
} from "../type/type";

export const spawnGameStateController = (): GameStateController => {
  return spawnStateController<GameStateType, GameActionNameType>(
    GameStateList.init,
    {
      statesOptionsList: [
        {
          name: GameStateList.init,
          actionToState: [
            [GameAction.toReadyToStart, GameStateList.readyToStart],
          ],
        },
        {
          name: GameStateList.readyToStart,
          actionToState: [
            [GameAction.toStart, GameStateList.start],
            [GameAction.toRestart, GameStateList.restart],
          ],
        },
        {
          name: GameStateList.start,
          actionToState: [
            [GameAction.toRestart, GameStateList.restart],
            [GameAction.toWin, GameStateList.win],
            [GameAction.toLose, GameStateList.lose],
          ],
        },
        {
          name: GameStateList.restart,
          actionToState: [[GameAction.toReadyToStart, GameStateList.readyToStart]],
        },
        {
          name: GameStateList.win,
          actionToState: [[GameAction.toEnd, GameStateList.end]],
        },
        {
          name: GameStateList.lose,
          actionToState: [[GameAction.toEnd, GameStateList.end]],
        },
        {
          name: GameStateList.end,
          actionToState: [[GameAction.toRestart, GameStateList.restart]],
        },
      ],
    }
  );
};

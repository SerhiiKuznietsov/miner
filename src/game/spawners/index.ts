import { ActionNames } from "../config/action";
import { StateNames } from "../config/state";
import { StateController } from "../controllers/state-controller";
import { AroundState } from "../states/around";
import { CloseState } from "../states/close";
import { EmptyState } from "../states/empty";
import { FalseFlagState } from "../states/false-flag";
import { FlagState } from "../states/flag";
import { MineState } from "../states/mine";
import { RedMineState } from "../states/mine-red";

export abstract class Spawner {
  public abstract spawn(): StateController;
}

export class EmptyTailStateSpawner extends Spawner {
  public spawn(): StateController {
    return new StateController([
      new CloseState([
        [ActionNames.rightClick, StateNames.flagState],
        [ActionNames.leftClick, StateNames.emptyState],
        [ActionNames.calc, StateNames.emptyState],
      ]),
      new FlagState([
        [ActionNames.rightClick, StateNames.closeState],
        [ActionNames.calc, StateNames.emptyState],
        [ActionNames.lose, StateNames.falseFlagState],
      ]),
      new FalseFlagState(),
      new EmptyState(),
    ]);
  }
}

export class SpawnerAroundTailState extends Spawner {
  private _around: number;

  constructor(around: number) {
    super();
    this._around = around;
  }

  public spawn(): StateController {
    return new StateController([
      new CloseState([
        [ActionNames.rightClick, StateNames.flagState],
        [ActionNames.leftClick, StateNames.aroundState],
        [ActionNames.calc, StateNames.aroundState],
      ]),
      new FlagState([
        [ActionNames.rightClick, StateNames.closeState],
        [ActionNames.calc, StateNames.aroundState],
        [ActionNames.lose, StateNames.falseFlagState],
      ]),
      new FalseFlagState(),
      new AroundState(this._around),
    ]);
  }
}

export class MineTailStateSpawner extends Spawner {
  public spawn(): StateController {
    return new StateController([
      new CloseState([
        [ActionNames.rightClick, StateNames.flagState],
        [ActionNames.leftClick, StateNames.redMineState],
        [ActionNames.win, StateNames.flagState],
        [ActionNames.lose, StateNames.mineState],
      ]),
      new FlagState([[ActionNames.rightClick, StateNames.closeState]]),
      new RedMineState(),
      new MineState(),
    ]);
  }
}

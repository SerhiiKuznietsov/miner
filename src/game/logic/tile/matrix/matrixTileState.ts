import { TileStateController } from "../../../services/stateControllers/tileStateController/tileStateController";
import { AroundTileStateController } from "../../../services/stateControllers/tileStateController/aroundTileStateController";
import { EmptyTileStateController } from "../../../services/stateControllers/tileStateController/emptyTileStateController";
import { MineTileStateController } from "../../../services/stateControllers/tileStateController/mineTileStateController";
import { MatrixItem } from "./matrixItem";

export const createTileStateByMatrix = (
  matrixItem: MatrixItem
): TileStateController => {
  if (matrixItem.isMine) {
    return new MineTileStateController();
  }

  if (matrixItem.around) {
    return new AroundTileStateController();
  }

  return new EmptyTileStateController();
};

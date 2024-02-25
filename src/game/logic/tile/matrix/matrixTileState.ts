import { TileStateController } from "../tailState/tileStateController/tileStateController";
import { AroundTileStateController } from "../tailState/tileStateController/aroundTileStateController";
import { EmptyTileStateController } from "../tailState/tileStateController/emptyTileStateController";
import { MineTileStateController } from "../tailState/tileStateController/mineTileStateController";
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

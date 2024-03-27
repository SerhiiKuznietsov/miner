import { Config } from "../../../config/game";
import { Vector2 } from "../../../utils/vector2";
import { createMatrixList } from "./matrixList";
import { createTileStateByMatrix } from "./matrixTileState";
import { MatrixGenerateContent } from "./type/type";

export const spawnTileMatrix = (
  config: Config,
  firsClick?: Vector2
): MatrixGenerateContent => {
  const list = createMatrixList(config, firsClick);

  const result: MatrixGenerateContent = [];

  list.forEach((matrixItem) => {
    const state = createTileStateByMatrix(matrixItem);

    result.push({ ...matrixItem, state, size: config.tileSize });
  });

  return result;
};

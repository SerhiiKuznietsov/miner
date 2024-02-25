import { Config } from "../../../config/game";
import { Vector2 } from "../../../geometry/vector2";
import { createMatrixList } from "./matrix-list";
import { createTailStateByMatrix } from "./matrix-tail-state";
import { MatrixGenerateContent } from "./type/type";

export const spawnTailMatrix = (
  config: Config,
  firsClick?: Vector2
): MatrixGenerateContent => {
  const list = createMatrixList(config, firsClick);

  const result: MatrixGenerateContent = [];

  list.forEach((matrixItem) => {
    const state = createTailStateByMatrix(matrixItem);

    result.push([matrixItem.id, state, matrixItem.around]);
  });

  return result;
};

import { Config } from "../../../config/game";
import { range } from "../../../utils/random";
import { MatrixItemGetter } from "../type/type";

export const useMatrixMineEnricher = (
  config: Config,
  matrixItemGetter: MatrixItemGetter
) => {
  for (let i = 0; i < config.minesCount; i++) {
    const xRandom = range(0, config.cols - 1);
    const yRandom = range(0, config.rows - 1);

    const matrixItem = matrixItemGetter(xRandom, yRandom);

    if (matrixItem.isOpen || matrixItem.isMine) {
      i--;
      continue;
    }

    matrixItem.isMine = true;
  }
};

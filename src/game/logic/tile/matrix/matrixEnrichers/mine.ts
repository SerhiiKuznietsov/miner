import { Config } from "../../../../config/game";
import { range } from "../../../../utils/random";
import { getListItem } from "../matrixList";
import { MatrixList } from "../type/type";

export const useMatrixMineEnricher = (
  list: MatrixList,
  config: Config
): void => {
  for (let i = 0; i < config.minesCount; i++) {
    const xRandom = range(0, config.cols - 1);
    const yRandom = range(0, config.rows - 1);

    const matrixItem = getListItem(xRandom, yRandom, list);

    if (matrixItem.isOpen || matrixItem.isMine) {
      i--;
      continue;
    }

    matrixItem.isMine = true;
  }
};

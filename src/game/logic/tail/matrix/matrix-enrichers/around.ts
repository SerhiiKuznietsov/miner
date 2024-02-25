import { Config } from "../../../../config/game";
import { getListItem } from "../matrix-list";
import { MatrixList } from "../type/type";

export const useMatrixMineAroundEnricher = (
  list: MatrixList,
  config: Config
): void => {
  list.forEach((item) => {
    if (item.isMine) return;

    for (let i = 0; i < config.minesCheckArr.length; i++) {
      const xAround = item.position.x + config.minesCheckArr[i][1];
      const yAround = item.position.y + config.minesCheckArr[i][0];

      if (
        yAround > -1 &&
        yAround < config.rows &&
        xAround > -1 &&
        xAround < config.cols
      ) {
        const matrixItemAround = getListItem(xAround, yAround, list);

        if (matrixItemAround.isMine) {
          item.around++;
        }
      }
    }
  });
};

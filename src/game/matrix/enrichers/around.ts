import { Config } from "../../config/game";
import { MatrixItemGetter, MatrixList } from "../type/type";

export class MatrixMineAroundEnricher {
  public enrich(
    list: MatrixList,
    config: Config,
    matrixItemGetter: MatrixItemGetter
  ) {
    list.forEach((matrixItem) => {
      if (matrixItem.isMine) return;

      for (let i = 0; i < config.minesCheckArr.length; i++) {
        const xAround = matrixItem.position.x + config.minesCheckArr[i][1];
        const yAround = matrixItem.position.y + config.minesCheckArr[i][0];

        if (
          yAround > -1 &&
          yAround < config.rows &&
          xAround > -1 &&
          xAround < config.cols
        ) {
          const matrixItemAround = matrixItemGetter(xAround, yAround);

          if (matrixItemAround.isMine) {
            matrixItem.around++;
          }
        }
      }
    });
  }
}

import { Config } from "../../config/game";
import { Random } from "../../utils/random";
import { MatrixItemGetter } from "../type/type";

export class MatrixMineEnricher {
  public enrich(config: Config, matrixItemGetter: MatrixItemGetter): void {
    for (let i = 0; i < config.minesCount; i++) {
      const xRandom = Random.range(0, config.cols - 1);
      const yRandom = Random.range(0, config.rows - 1);

      const matrixItem = matrixItemGetter(xRandom, yRandom);

      if (matrixItem.isOpen || matrixItem.isMine) {
        i--;
        continue;
      }

      matrixItem.isMine = true;
    }
  }
}

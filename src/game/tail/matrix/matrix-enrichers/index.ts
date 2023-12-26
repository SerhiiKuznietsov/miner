import { Config } from "../../../config/game";
import { MatrixList } from "../type/type";
import { useMatrixMineAroundEnricher } from "./around";
import { useMatrixMineEnricher } from "./mine";

export const useMatrixEnricher = (list: MatrixList, config: Config): void => {
  useMatrixMineEnricher(list, config);

  useMatrixMineAroundEnricher(list, config);
};

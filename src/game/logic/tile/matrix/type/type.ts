import { TileStateController } from "../../../../services/stateControllers/tileStateController/tileStateController";
import { MatrixItem } from "../matrixItem";

export type MatrixItemContent = MatrixItem & {
  state: TileStateController;
  size: number;
};

export type MatrixGenerateContent = Array<MatrixItemContent>;

export type MatrixList = Map<string, MatrixItem>;

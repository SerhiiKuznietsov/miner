import { TailStateController } from "../../../../stateControllers/tailStateController/tailStateController";
import { MatrixItem } from "../matrix-item";

export type MatrixItemContent = MatrixItem & {
  state: TailStateController;
  size: number;
};

export type MatrixGenerateContent = Array<MatrixItemContent>;

export type MatrixList = Map<string, MatrixItem>;

import { StateController } from "../../../controllers/state-controller";
import { MatrixItem } from "../matrix-item";

export type MatrixGenerateContent = Array<
  [string, StateController, number]
>;

export type MatrixItemGetter = (x: number, y: number) => MatrixItem;
export type MatrixList = Map<string, MatrixItem>;

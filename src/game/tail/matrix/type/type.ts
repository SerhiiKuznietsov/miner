import { StateController } from "../../../controllers/state-controller";
import { MatrixItem } from "../matrix-item";

export type MatrixGenerateContent = Array<[string, StateController, number]>;

export type MatrixList = Map<string, MatrixItem>;

import { TailStateController } from "../../../stateControllers/tailStateController/tailStateController";
import { MatrixItem } from "../matrix-item";

export type MatrixGenerateContent = Array<[string, TailStateController, number]>;

export type MatrixList = Map<string, MatrixItem>;

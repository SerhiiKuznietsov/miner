import { createDivElement } from "../../utils/html/element";
import { createId } from "../../utils/id";

export const createFieldCell = (
  x: number,
  y: number,
  size: number
): HTMLDivElement => {
  return createDivElement("miner__cube", size, [["data-id", createId(x, y)]]);
};

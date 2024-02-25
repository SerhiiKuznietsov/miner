import { createDivElement } from "./element";

export const createCell = (id: string, size: number): HTMLDivElement => {
  return createDivElement("miner__cube", size, [["data-id", id]]);
};

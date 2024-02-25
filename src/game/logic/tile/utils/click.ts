import { ClickTileData } from "../type/type";
import { getDatasetWithElement, getIdWithDataset } from "./dataset";

const getTargetElement = (e: Event): HTMLElement => {
  const target = <HTMLElement>e.target;

  if (!target) {
    throw new Error("Target with event not found");
  }

  return target;
};

const getIdWithTarget = (e: Event): string => {
  const target = getTargetElement(e);
  const dataset = getDatasetWithElement(target);

  return getIdWithDataset(dataset);
};

export const getEventData = (e: Event): ClickTileData => {
  const id = getIdWithTarget(e);
  e;

  return {
    id,
    eventType: e.type,
  };
};

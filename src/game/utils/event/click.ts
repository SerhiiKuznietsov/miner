import { getDatasetWithElement } from "../element";

const getTargetElement = (e: Event): HTMLElement => {
  const target = <HTMLElement>e.target;

  if (!target) {
    throw new Error("Target with event not found");
  }

  return target;
};

export const getDatasetWithEventTarget = (e: Event): DOMStringMap => {
  const target = getTargetElement(e);
  const dataset = getDatasetWithElement(target);

  return dataset;
};
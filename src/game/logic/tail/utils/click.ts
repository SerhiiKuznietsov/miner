import { getDatasetWithElement } from "./dataset";

const getTargetElement = (e: Event): HTMLElement => {
  const target = <HTMLElement>e.target;

  if (!target) {
    throw new Error("Target with event not found");
  }

  return target;
};

const getDatasetWithEventTarget = (e: Event): DOMStringMap => {
  const target = getTargetElement(e);
  const dataset = getDatasetWithElement(target);

  return dataset;
};

const getDatasetId = (dataset: DOMStringMap): string => {
  if (!dataset.id) {
    throw new Error(`Element dataset attr with name "id" not found`);
  }
  return dataset.id;
};

export const getAttrsWithEvent = (e: Event): string => {
  const dataset = getDatasetWithEventTarget(e);

  return getDatasetId(dataset);
};

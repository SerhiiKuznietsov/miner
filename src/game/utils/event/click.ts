import { getDatasetWithElement } from "../element";

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


const getDatasetAttrs = (dataset: DOMStringMap): [number, number] => {
  if (!dataset.x || !dataset.y) {
    throw new Error("Element dataset attrs is empty");
  }

  const x: number = +dataset.x;
  const y: number = +dataset.y;

  return [x, y];
};

export const getAttrsWithEvent = (e: Event): [number, number] => {
  const dataset = getDatasetWithEventTarget(e);

  return getDatasetAttrs(dataset);
};
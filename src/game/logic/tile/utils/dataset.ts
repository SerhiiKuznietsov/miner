export const getDatasetWithElement = (element: HTMLElement): DOMStringMap =>
  element.dataset;

export const getIdWithDataset = (dataset: DOMStringMap): string => {
  if (!dataset.id) {
    throw new Error(`Element dataset attr with name "id" not found`);
  }
  return dataset.id;
};

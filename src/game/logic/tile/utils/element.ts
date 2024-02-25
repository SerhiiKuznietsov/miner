import { convertSizeToPx } from "./px";

export const createDivElement = (
  className: string,
  size: number,
  attrs: Array<[string, string | number]>
): HTMLDivElement => {
  const div = document.createElement("div");

  div.classList.add(className);

  div.style.width = convertSizeToPx(size);
  div.style.height = convertSizeToPx(size);

  attrs.forEach(([name, value]) => {
    div.setAttribute(name, String(value));
  });

  return div;
};

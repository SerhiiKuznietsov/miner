import { Config } from "../../../config/game";
import { Vector2 } from "../../../utils/vector2";
import { createId } from "../../../utils/id";
import { useMatrixEnricher } from "./matrixEnrichers";
import { MatrixItem } from "./matrixItem";
import { MatrixList } from "./type/type";

export const createMatrixList = (
  config: Config,
  firsClick?: Vector2
): MatrixList => {
  const list: MatrixList = new Map();

  for (let i = 0, y = -1, x = 0; i < config.rows * config.cols; i++, x++) {
    if (i % config.cols === 0) {
      x = 0;
      y++;
    }

    const id = createId(x, y);
    const newMatrixItem = new MatrixItem(x, y, id);
    list.set(id, newMatrixItem);

    if (firsClick && firsClick.x === x && firsClick.y === y) {
      newMatrixItem.isOpen = true;
    }
  }

  if (!firsClick) return list;

  useMatrixEnricher(list, config);

  return list;
};

export const getListItem = (
  x: number,
  y: number,
  list: MatrixList
): MatrixItem => {
  const id = createId(x, y);

  const item = list.get(id);

  if (!item) {
    throw new Error(`Matrix item with id: ${id} not found`);
  }

  return item;
};

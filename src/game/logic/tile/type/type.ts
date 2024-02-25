import { Vector2 } from "../../../geometry/vector2";

export type FirstClickType = Vector2 | undefined;

export type ClickTileData = {
  id: string;
  eventType: string;
};
export type ClickTileHandler = (data: ClickTileData) => void;

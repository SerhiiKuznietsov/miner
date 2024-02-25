import { Vector2 } from "../../../geometry/vector2";

export class MatrixItem {
  public readonly position: Vector2;
  public readonly id: string;
  public isOpen: boolean = false;
  public isMine: boolean = false;
  public around: number = 0;

  constructor(x: number, y: number, id: string) {
    this.position = new Vector2(x, y);
    this.id = id;
  }
}

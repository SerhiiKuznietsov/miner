import { Face } from "./face";
import { Field } from "./field";

export class Screen {
  private _field = new Field(this._config);
  private _face = new Face();

}
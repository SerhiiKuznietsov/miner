import { Image } from "../image";

export class MineImage extends Image {
  public static mineWrong: string = "mine_wrong.svg";
  public static mineRed: string = "mine_red.svg";
  public static mine: string = "mine.svg";
  public static flag: string = "flag.svg";
  public static closed: string = "closed.svg";
  public static mineCount(num: number = 0) {
    return `type${num}.svg`;
  }
}

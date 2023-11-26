import { MineImage } from "./image/mine-image";

export class MineView {
  public static setImageMineRed(element: HTMLElement) {
    MineImage.setBackgroundImage(element, MineImage.mineRed);
  }

  public static setImageFlag(element: HTMLElement) {
    MineImage.setBackgroundImage(element, MineImage.flag);
  }

  public static setImageClosed(element: HTMLElement) {
    MineImage.setBackgroundImage(element, MineImage.closed);
  }

  public static setImageType(element: HTMLElement, mineAround: number = 0) {
    MineImage.setBackgroundImage(element, MineImage.mineCount(mineAround));
  }

  public static setImageMine(element: HTMLElement) {
    MineImage.setBackgroundImage(element, MineImage.mine);
  }

  public static setImageMineWrong(element: HTMLElement) {
    MineImage.setBackgroundImage(element, MineImage.mineWrong);
  }
}

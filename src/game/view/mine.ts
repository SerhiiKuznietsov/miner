import { MineImage } from "./image/mine-image";

export class MineView {
  private static setImage(element: HTMLElement, imagePath: string) {
    MineImage.setBackgroundImage(element, imagePath);
  }

  public static setImageMineRed(element: HTMLElement) {
    this.setImage(element, MineImage.mineRed);
  }

  public static setImageFlag(element: HTMLElement) {
    this.setImage(element, MineImage.flag);
  }

  public static setImageClosed(element: HTMLElement) {
    this.setImage(element, MineImage.closed);
  }

  public static setImageType(element: HTMLElement, mineAround: number = 0) {
    this.setImage(element, MineImage.mineCount(mineAround));
  }

  public static setImageMine(element: HTMLElement) {
    this.setImage(element, MineImage.mine);
  }

  public static setImageMineWrong(element: HTMLElement) {
    this.setImage(element, MineImage.mineWrong);
  }
}

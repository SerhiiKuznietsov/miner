import { FaceImage } from "./image/face-image";

export class FaceView {
  private static setImage(element: HTMLElement, imagePath: string) {
    FaceImage.setBackgroundImage(element, imagePath);
  }

  public static setPressed(element: HTMLElement) {
    this.setImage(element, FaceImage.facePressed);
  }

  public static setUnpressed(element: HTMLElement) {
    this.setImage(element, FaceImage.faceUnpressed);
  }

  public static setWin(element: HTMLElement) {
    this.setImage(element, FaceImage.faceWin);
  }

  public static setLose(element: HTMLElement) {
    this.setImage(element, FaceImage.faceLose);
  }
}

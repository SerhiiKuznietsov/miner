import { FaceImage } from "./image/face-image";

export class FaceView {
  public static setPressed(element: HTMLElement) {
    FaceImage.setBackgroundImage(element, FaceImage.facePressed);
  }

  public static setUnpressed(element: HTMLElement) {
    FaceImage.setBackgroundImage(element, FaceImage.faceUnpressed);
  }

  public static setWin(element: HTMLElement) {
    FaceImage.setBackgroundImage(element, FaceImage.faceWin);
  }

  public static setLose(element: HTMLElement) {
    FaceImage.setBackgroundImage(element, FaceImage.faceLose);
  }
}

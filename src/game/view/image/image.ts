export class Image {
  public static setBackgroundImage(
    element: HTMLElement,
    imagePath: string
  ): void {
    element.style.backgroundImage = `url(./src/img/${imagePath})`;
  }
}

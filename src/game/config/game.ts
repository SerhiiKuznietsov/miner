export class Config {
  public rows: number = 10;
  public cols: number = 10;
  public tileSize: number = 55;
  public minesCount: number = 3;
  public needToOpen: number = this.cols * this.rows - this.minesCount;
  public minesCheckArr = [
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
  ];
}

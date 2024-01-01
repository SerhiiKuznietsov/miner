export enum ActionNamesList {
  rightClick = "rightClick",
  leftClick = "leftClick",
  lose = "lose",
  win = "win",
  calc = "calc",
}

export type ActionName =
  | ActionNamesList.rightClick
  | ActionNamesList.leftClick
  | ActionNamesList.lose
  | ActionNamesList.win
  | ActionNamesList.calc;

// TODO - put this code from here
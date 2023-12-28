import { Observable } from "./observable";

export enum ClickEvent {
  right = "right",
  left = "left",
}

export type GameEventType = ClickEvent.right | ClickEvent.left;
export type ClickEventObserverDataType = [GameEventType, Event];

class ClickEventObserver extends Observable<ClickEventObserverDataType> {}

export const clickEventObserver = new ClickEventObserver();

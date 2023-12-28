import { Observable } from "./observable";

class TimeObserver extends Observable<string> {}

export const timeObserver = new TimeObserver();

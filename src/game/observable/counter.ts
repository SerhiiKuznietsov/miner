import { Observable } from "./observable";

class CounterObserver extends Observable<number> {}

export const counterObserver = new CounterObserver();

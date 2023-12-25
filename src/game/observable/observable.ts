export type ObserverType = Function;

export type ObserversList = Set<ObserverType>;

// export type EventNameType = "win" | "lose";

export class Observable<E, D> {
  private observers = new Map<E, ObserversList>();

  private getObserversByEventName(eventName: E): ObserversList {
    const observersList = this.observers.get(eventName);

    if (!observersList) {
      throw new Error(`Observers with event name "${eventName}" not found`);
    }

    return observersList;
  }

  public attach(eventName: E, observer: ObserverType): this {
    if (!this.observers.has(eventName)) {
      this.observers.set(eventName, new Set());
    }

    this.getObserversByEventName(eventName).add(observer);

    return this;
  }

  public detach(eventName: E, observer: ObserverType): this {
    this.getObserversByEventName(eventName).delete(observer);

    return this;
  }

  public notify(eventName: E, data?: D): this {
    this.getObserversByEventName(eventName).forEach((observer) => {
      observer(data);
    });

    return this;
  }
}
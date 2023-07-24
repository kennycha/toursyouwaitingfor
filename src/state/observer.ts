import { Nullable } from "../types";

let currentObserver: Nullable<Function> = null;

export const observe = (callback: Function) => {
  currentObserver = callback;
  callback();
  currentObserver = null;
};

export const observable = <T extends { [key: string]: any }>(state: T): T => {
  Object.keys(state).forEach((key) => {
    let _value = state[key];
    const observers = new Set<Function>();

    Object.defineProperty(state, key, {
      get() {
        if (currentObserver) {
          observers.add(currentObserver);
        }
        return _value;
      },
      set(value: any) {
        _value = value;
        observers.forEach((observer) => observer());
      },
    });
  });

  return state;
};

import { describe, it, expect } from "@jest/globals";
import { val } from "value-enhancer";
import { assignActions, createStore } from "../src";

describe("createStore", () => {
  it("should create Store with actions", () => {
    const store = createStore(1, state$ => ({
      add: (step = 0) => state$.set(state$.value + step),
    }));
    expect(store.value).toBe(1);

    store.act.add(2);
    expect(store.value).toBe(3);
  });

  it("should create Store without actions", () => {
    const store = createStore({ count: 1 });
    expect(store.value).toEqual({ count: 1 });
  });
});

describe("assignActions", () => {
  it("should assign actions to val", () => {
    const state$ = val({ count: 1 });
    const actions = {
      add: (step = 0) => state$.set({ count: state$.value.count + step }),
    };

    const store$ = assignActions(state$, actions);

    expect(store$).toBe(state$);

    expect(store$.value).toEqual({ count: 1 });

    store$.act.add(2);
    expect(store$.value).toEqual({ count: 3 });
  });
});

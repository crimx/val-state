import type { ReadonlyVal, Val, ValConfig } from "value-enhancer";
import { val } from "value-enhancer";

export type Store<
  TState,
  TActions extends {} | unknown = unknown
> = Val<TState> & { act: TActions };

export type State<TVal extends ReadonlyVal> = TVal extends ReadonlyVal<
  infer TState
>
  ? TState
  : never;

/**
 * Assign the actions as `act` property of the val.
 */
export const assignActions = <TVal extends Val, TActions extends {}>(
  state$: TVal,
  actions: TActions
): Store<State<TVal>, TActions> => {
  (state$ as any).act = actions;
  return state$ as any;
};

/**
 * Create a val from state and assign the actions as its `act` property.
 */
export const createStore = <TState, TActions extends {} | unknown = unknown>(
  state: TState,
  getActions?: (state$: Val<TState>) => TActions,
  config?: ValConfig<TState>
): Store<TState, TActions> => {
  const state$ = val(state, config);
  if (getActions) {
    const actions = getActions(state$);
    if (actions) {
      assignActions(state$, actions as {});
    }
  }
  return state$ as Store<TState, TActions>;
};

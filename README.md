# [val-state](https://github.com/crimx/val-state)

<p align="center">
  <img width="200" src="https://raw.githubusercontent.com/crimx/value-enhancer/main/assets/value-enhancer.svg">
</p>

[![Build Status](https://github.com/crimx/val-state/actions/workflows/build.yml/badge.svg)](https://github.com/crimx/val-state/actions/workflows/build.yml)
[![npm-version](https://img.shields.io/npm/v/val-state.svg)](https://www.npmjs.com/package/val-state)
[![Coverage Status](https://img.shields.io/coveralls/github/crimx/val-state/main)](https://coveralls.io/github/crimx/val-state?branch=main)
[![minified-size](https://img.shields.io/bundlephobia/minzip/val-state)](https://bundlephobia.com/package/val-state)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?maxAge=2592000)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg?maxAge=2592000)](https://conventionalcommits.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

State management with [value-enhancer](https://github.com/crimx/value-enhancer).

## Install

```bash
npm add val-state value-enhancer
```

## Usage

```ts
import { createStore } from "val-state";

const store$ = createStore({
  count: 0,
});

store$.subscribe(state => {
  console.log(state);
});
```

Create store with actions:

```ts
import { createStore } from "val-state";

const store$ = createStore(
  {
    count: 0,
  },
  state$ => ({
    increment: (step = 1) => {
      state$.set({ count: state$.value.count + step });
    },
  })
);

store$.subscribe(state => {
  console.log(state);
});

store$.increment();
```

Assign actions to normal val:

```ts
import { val } from "value-enhancer";
import { assignActions } from "val-state";

const state$ = val({ count: 1 });

const store$ = assignActions(state$, {
  increment: (step = 1) => {
    state$.set({ count: state$.value.count + step });
  },
});

assert(store$ === state$);

store$.increment();
```

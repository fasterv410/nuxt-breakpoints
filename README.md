# nuxt-breakpoints-v2

> Resize observer breakpoints with Nuxt.js module.


[![Codecov](https://codecov.io/gh/steven0811/nuxt-breakpoints/branch/master/graph/badge.svg)](https://codecov.io/gh/steven0811/nuxt-breakpoints)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Package Size](https://img.shields.io/bundlephobia/minzip/nuxt-breakpoints)](https://nodei.co/npm/nuxt-breakpoints/)

## New Update
 - Add breakpoint 1600px(xxl)
 - Can include scrollbar size on breakpoints
 - Add loading params for checking load on client

[DEMO](https://steven0811.github.io/nuxt-breakpoints/)

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `nuxt-breakpoints` dependency to your project

```bash
yarn add nuxt-breakpoints # or npm install nuxt-breakpoints
```

2. Add `nuxt-breakpoints` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    'nuxt-breakpoints',

    // With options
    ['nuxt-breakpoints', { /* module options */ }]
  ]

  // Another way to use options
  breakpoints: {
    // default options
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600, // Add new breakpoint
    options: {
      polyfill: true,
      throttle: 200,
      scrollbar: true // Include scrollbar width | height in breakpoints
    }
  }
}
```
## Usage
```js
// components.vue
export default {
  computed: {
    isMdOrSm () { return this.$breakpoints.md || this.$breakpoints.sm },
    isLargeThanSm() {
      return this.$breakpoints.lSm // Is Large than sm include sm
    },
    isSmallThanMd() {
      return this.$breakpoints.sMd // Is Small than md include md
    }
    // ... etc lSm lMd lLg, and sSm sMd sLg
  }
}
```

```html
<!-- components.vue -->
<template>
  <div v-if="$breakpoints.loading">Loading...</div>
  <div v-else>
    <h1>Page title</h1>
    <p>Page content</p>
  </div>
</template>
```

## Options
| property | type                                        | default                           | note                                                                                                                                                                                                                          |
|----------|---------------------------------------------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| xs       | none                                        | none                              | <= 576px，Extra small, smallest.                                                                                                                                                                                              |
| sm       | number                                      | 576                               | >= 576px(sm) && <= 768px(md)                                                                                                                                                                                                  |
| md       | number                                      | 768                               | >= 768px(md) && <= 992px(lg)                                                                                                                                                                                                  |
| lg       | number                                      | 992                               | >= 992px(lg) && <= 1200px(xl)                                                                                                                                                                                                 |
| xl       | number                                      | 1200                              | >= 1200px(xl) && <= 1600px(xxl)                                                                                                                                                                                              |
| xxl       | number                                      | 1600                              | >= 1600, Extra large, largest.                                                                                                                                                                                              |
| options  | object<polyfill: boolean, throttle: number> | { polyfill: true, throttle: 200 } | `polyfill` default by true, which means will auto-import `resize-observer-polyfill` when the browser doesn't support ResizeObserver more information below, `throttle` will slow down when Window has resizing trigger speed. |

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`


## Ref
[Nuxt.js](https://nuxtjs.org)

[MDN - ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)

[ResizeObserver Polyfill](https://github.com/que-etc/resize-observer-polyfill)




## License

[MIT License](./LICENSE)

Copyright (c) Steven Ho <shockshocksoul@gmail.com>

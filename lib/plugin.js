import Vue from 'vue'
import throttle from 'lodash/throttle'
const extend = (app, mixin) => {
  if (!app.mixins) {
    app.mixins = []
  }
  app.mixins.push(mixin)
}


const defaultOptions = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
  options: {
    polyfill: true,
    throttle: 200,
    scrollbar: true // Include scrollbar width in breakpoints
  }
}

const defaultBreakpoints = {
  current: 'xs',

  xs: true,

  sm: false,
  lSm: false,
  sSm: true,

  md: false,
  lMd: false,
  sMd: true,

  lg: false,
  lLg: false,
  sLg: true,

  xl: false,
  lXl: false,
  sXl: true,

  xxl: false,

  width: 0,
  height: 0
}

const transformBreakpoints = (breakpoints, { width, height }, options) => {
  const { sm, md, lg, xl, xxl } = options

  if (options.options.scrollbar) {
    // include scrollbar in breakpoints
    width = window.innerWidth
    height = window.innerHeight
  }

  const breakpointRoles = { xs: 0, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5 }

  let currentActive = 'xs'

  switch (true) {
    case width >= xxl:
      currentActive = 'xxl'
      break
    case width >= xl:
      currentActive = 'xl'
      break
    case width >= lg:
      currentActive = 'lg'
      break
    case width >= md:
      currentActive = 'md'
      break
    case width >= sm:
      currentActive = 'sm'
      break
    default:
      currentActive = 'xs'
      break
  }

  const decideLargeOrSmallThan = (point, large = false) =>
    large
      ? breakpointRoles[point] <= breakpointRoles[currentActive]
      : breakpointRoles[point] >= breakpointRoles[currentActive]

  const transformData = {
    sm: currentActive === 'sm',
    lSm: decideLargeOrSmallThan('sm', true),
    sSm: decideLargeOrSmallThan('sm'),

    md: currentActive === 'md',
    lMd: decideLargeOrSmallThan('md', true),
    sMd: decideLargeOrSmallThan('md'),

    lg: currentActive === 'lg',
    lLg: decideLargeOrSmallThan('lg', true),
    sLg: decideLargeOrSmallThan('lg'),

    xl: currentActive === 'xl',
    lXl: decideLargeOrSmallThan('xl', true),
    sXl: decideLargeOrSmallThan('xl')
  }

  Object.assign(breakpoints, transformData, {
    current: currentActive,
    xs: currentActive === 'xs',
    xxl: currentActive === 'xxl',
    width: ~~width,
    height: ~~height
  })
}

export default async (ctx, inject) => {
  const options = { ...defaultOptions, ...<%= JSON.stringify(options, null, 2) %>}

  const breakpoints = Vue.observable(defaultBreakpoints)

  if (process.server) {
    ctx.$breakpoints = breakpoints
    inject('breakpoints', breakpoints)
    return
  }

  const needPolyfill =
    !Object.prototype.hasOwnProperty.call(window, 'ResizeObserver') &&
    options.options.polyfill



    if (needPolyfill) {
      const ResizeObserver = await import('resize-observer-polyfill')
      
      Object.defineProperty(window, 'ResizeObserver', {
        value: ResizeObserver.default,
        writable: false
      })
    }
    
    const bodyElem = document.querySelector('body')
    
    const resizeObserver = new ResizeObserver(
      throttle((entries) => {
        const [{ contentRect }] = entries
      transformBreakpoints(breakpoints, contentRect, options)
    }, +options.options.throttle, { trailing: true, leading: false })
  )

  extend(ctx.app, {
    beforeDestroy () {
      resizeObserver.unobserve(bodyElem)
    }
  })

  resizeObserver.observe(bodyElem)

  ctx.$breakpoints = breakpoints
  inject('breakpoints', breakpoints)
}

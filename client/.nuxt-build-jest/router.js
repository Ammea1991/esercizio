import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'// eslint-disable-line no-unused-vars
import scrollBehavior from './router.scrollBehavior.js'

const _5032cc7d = () => interopDefault(import('../pages/changepassword.vue' /* webpackChunkName: "pages/changepassword" */))
const _237c1cde = () => interopDefault(import('../pages/home.vue' /* webpackChunkName: "pages/home" */))
const _103db1b2 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _7f60cfe7 = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _55522ec0 = () => interopDefault(import('../pages/streaming.vue' /* webpackChunkName: "pages/streaming" */))
const _5f48cccf = () => interopDefault(import('../pages/subscription.vue' /* webpackChunkName: "pages/subscription" */))
const _6645ed16 = () => interopDefault(import('../pages/movies/_movieid.vue' /* webpackChunkName: "pages/movies/_movieid" */))
const _2e398410 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,
  /* eslint-disable array-bracket-spacing, quotes, quote-props, object-curly-spacing, key-spacing */
  routes: [{
    path: "/changepassword",
    component: _5032cc7d,
    name: "changepassword"
  }, {
    path: "/home",
    component: _237c1cde,
    name: "home"
  }, {
    path: "/login",
    component: _103db1b2,
    name: "login"
  }, {
    path: "/profile",
    component: _7f60cfe7,
    name: "profile"
  }, {
    path: "/streaming",
    component: _55522ec0,
    name: "streaming"
  }, {
    path: "/subscription",
    component: _5f48cccf,
    name: "subscription"
  }, {
    path: "/movies/:movieid?",
    component: _6645ed16,
    name: "movies-movieid"
  }, {
    path: "/",
    component: _2e398410,
    name: "index"
  }],
  /* eslint-enable array-bracket-spacing, quotes, quote-props, object-curly-spacing, key-spacing */

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}

import gcLayout from './app.vue'

/* istanbul ignore next */
gcLayout.install = function (Vue, opt = {}) {
  Vue.component('gcLayout', gcLayout)
  Vue.prototype.$OPTION = opt
}

export default gcLayout
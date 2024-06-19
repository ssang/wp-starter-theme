import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from 'tailwind.config.js'

const tw = resolveConfig(tailwindConfig)

export default {
  init() {
    this.toggleable = ! window.matchMedia('(min-width: ' + tw.theme.screens.lg + ')').matches

    this.setNavStatus()
  },

  toggleable: false,

  stuck: false,

  open: false,

  toggleNav() {
    this.open = ! this.open
  },

  setNavStatus() {
      this.open = window.matchMedia('(min-width: ' + tw.theme.screens.lg + ')').matches
  }
}
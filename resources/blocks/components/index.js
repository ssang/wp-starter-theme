export { default as Block } from './Block'
export { default as Button } from './Button'
export { default as Prose } from './Prose'
export { default as SettingsLabel } from './SettingsLabel'
export { default as PlaceholderImage } from './PlaceholderImage'

export const Content_Blocks = [
  'crew/button',
  'crew/image',
  'core/paragraph',
  'core/heading',
  'core/quote',
  'core/list',
]

export const _class = (classes) => {
  const defaultClasses = classes.default ?? ''
  const classlist = Object.keys(classes).filter(key => { 
    return key !== 'default' && classes[key] !== false
  })

  return `${defaultClasses} ${Object.values(classlist).join(' ')}`
}
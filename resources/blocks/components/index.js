export { default as Block } from './Block'
export { default as Badge } from './Badge'
export { default as Button } from './Button'
export { default as Prose } from './Prose'
export { default as SectionHeader } from './SectionHeader'
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

export const Brand_Colors = [
  { name: 'Transparent', color: 'transparent' },
  { name: 'Icy Blue', color: '#BCD5DA' },
  { name: 'Curiosity Teal', color: '#259591' },
  { name: 'Elegant Blue-Green', color: '#174A5B' },
  { name: 'Flourishing Pink', color: '#DF4661' },
  { name: 'Irreverent Yellow', color: '#FDDA25' },
  { name: 'Subtle Rose', color: '#D86C71' },
  { name: 'Citron Green', color: '#C6D843' },
  { name: 'Tangerine Orange', color: '#EB7722' },
]

export const Text_Colors = [
  { name: 'White', color: '#FFF' },
  { name: 'Elegant Blue-Green', color: '#174A5B' },
]

export const updateObject = (key, newValues, oldValues, setAttributes) => {
  const object = { ...oldValues }

  for (const property in newValues) {
    object[property] = newValues[property]
  }

  setAttributes({
    [key]: object
  })
}

export const _class = (classes) => {
  const classlist = Object.keys(classes).filter(key => { 
    return classes[key] !== false; 
  })

  return Object.values(classlist).join(' ')
}
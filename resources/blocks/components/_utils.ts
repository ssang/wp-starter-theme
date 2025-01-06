export const dark_colors = ['navy', 'green'];

export function isDark(color) {
  return color === 'navy' || color === 'green';
}

export const _class = (classes) => {
  const defaultClasses = classes.default ?? '';
  const classlist = Object.keys(classes).filter((key) => {
    return key !== 'default' && classes[key] !== false;
  });

  return `${defaultClasses} ${Object.values(classlist).join(' ')}`;
};

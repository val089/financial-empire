/**
 * Converts color to rgba format with specified opacity
 *
 * @param color Color in HEX format (#RRGGBB)
 * @param alpha Opacity value (0-1)
 * @returns Color in rgba() format
 */
export const rgba = (color: string, alpha: number): string => {
  if (color.startsWith('#')) {
    let hexColor = color;
    if (hexColor.length === 4) {
      hexColor = `#${hexColor[1]}${hexColor[1]}${hexColor[2]}${hexColor[2]}${hexColor[3]}${hexColor[3]}`;
    }

    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
  }

  return color;
};

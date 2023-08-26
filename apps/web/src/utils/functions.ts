function pxToRem(number: number, baseNumber = 16) {
  return `${number / baseNumber}rem`;
}

function rgba(color: string, opacity: number) {
  return `rgba(${hexToRgb(color)}, ${opacity})`;
}

function hexToRgb(color: string) {
  return color;
}

function boxShadow(
  offset = [],
  radius = [],
  color: string,
  opacity: number,
  inset = ""
) {
  const [x, y] = offset;
  const [blur, spread] = radius;

  return `${inset} ${pxToRem(x)} ${pxToRem(y)} ${pxToRem(blur)} ${pxToRem(
    spread
  )} ${rgba(color, opacity)}`;
}

export { pxToRem, rgba, hexToRgb, boxShadow };

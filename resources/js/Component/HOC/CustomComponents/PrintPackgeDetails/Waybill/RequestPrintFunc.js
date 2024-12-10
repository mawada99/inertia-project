const PRINT_WIDTH_LANDSCAPE = 29.7 - 2; // 2 cm is page margin on both sides
const PRINT_WIDTH_PORTRAIT = 21 - 2; // 2 cm is page margin on both sides

export const cmToPx = (size) => {
  let e = document.createElement("div");
  const test = 10;
  e.style.position = "absolute";
  e.style.width = test + "cm";
  document.body.appendChild(e);
  let rect = e.getBoundingClientRect();
  document.body.removeChild(e);
  let pixels = rect.width / test;
  return pixels * size;
};

export const zoom = (width = PRINT_WIDTH_PORTRAIT) => {
  let table = document.getElementById("requestPrintTable");
  let tableWidth = table?.offsetWidth;
  let percent = cmToPx(width) / tableWidth;
  document
    .querySelectorAll("#requestPrintTable")
    .forEach((i) => (i.style.zoom = cmToPx(width) / i.offsetWidth));
  if (width === PRINT_WIDTH_PORTRAIT && percent < 0.75) {
    return zoom(PRINT_WIDTH_LANDSCAPE);
  }

  return {
    percent: percent,
    width: cmToPx(width),
    css:
      width === PRINT_WIDTH_PORTRAIT
        ? "print-portrait.css"
        : "print-landscape.css",
  };
};

export const customerZoom = (width = PRINT_WIDTH_PORTRAIT, tableWidthIn) => {
  let table = document.getElementById("requestPrintTable");
  let tableWidth = tableWidthIn ?? table.offsetWidth;
  let percent = cmToPx(width) / tableWidth;
  document
    .querySelectorAll("#requestPrintTable")
    .forEach((i) => (i.style.zoom = cmToPx(width) / i.offsetWidth));
  if (width === PRINT_WIDTH_PORTRAIT && percent < 0.75) {
    return zoom(PRINT_WIDTH_LANDSCAPE);
  }

  return {
    percent: percent,
    width: cmToPx(width),
    css:
      width === PRINT_WIDTH_PORTRAIT
        ? "print-portrait.css"
        : "print-landscape.css",
  };
};

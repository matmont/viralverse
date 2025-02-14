export function saveToSvg(chartElement: HTMLDivElement) {
  let chartSVG = chartElement.children?.[0]?.children?.[0];

  if (!chartSVG) {
    console.error("Problem while saving chart...");
  }

  let svgURL = new XMLSerializer().serializeToString(chartSVG);
  let svgBlob = new Blob([svgURL], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  const a = document.createElement("a");
  a.download = "chart.svg";
  document.body.appendChild(a);
  a.href = url;
  a.click();
  a.remove();
}

const items = [...document.querySelectorAll('.summary-item')];

const rows = items.map(item => {
  const title = (item.querySelector('h2[data-testid="SummaryItemHed"]')?.innerText || "").replace(/,/g, "");
  const urlPath = item.querySelector('a.SummaryItemHedLink-cxRzVg')?.getAttribute("href") || "";
  const url = urlPath.startsWith("http") ? urlPath : ("https://www.newyorker.com" + urlPath);
  const author = (item.querySelector('.summary-item__byline-name, [data-testid="BylineName"]')?.innerText || "").replace(/,/g, "");
  const date = item.querySelector('time')?.innerText || "";

  return `${title},${author},${date},${url}`;
});

const header = "Title,Author,Date,URL\n";
const csv = header + rows.join("\n");
const blob = new Blob([csv], { type: "text/csv" });
const link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = "newyorker_saved.csv";
link.click();

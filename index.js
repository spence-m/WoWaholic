// This isn't used any more to generate dates dynamically
// but is worth keeping to generate future years.
function main() {
  const warsongEpoch = new Date(2020, 2, 13);
  const arathiEpoch = new Date(2020, 2, 20);
  const alteracEpoch = new Date(2020, 3, 3);
  const start = new Date(2020, 2, 13);
  const thisYear = new Date().getFullYear();
  document.getElementById("title").innerText += " " + thisYear;

  let i = 0;
  const dates = [];
  while (start.getFullYear() <= thisYear) {
    const row = [];
    const warsongDate = new Date(warsongEpoch);
    warsongDate.setDate(warsongDate.getDate() + 28 * i);
    const arathiDate = new Date(arathiEpoch);
    arathiDate.setDate(arathiDate.getDate() + 28 * i);
    const alteracDate = new Date(alteracEpoch);
    alteracDate.setDate(alteracDate.getDate() + 28 * i);

    if (warsongDate.getFullYear() === thisYear) {
      row.push({
        key: "warsong",
        date: warsongDate.toLocaleDateString(),
      });
    }
    if (arathiDate.getFullYear() === thisYear) {
      row.push({
        key: "arathi",
        date: arathiDate.toLocaleDateString(),
      });
    }
    if (alteracDate.getFullYear() === thisYear) {
      row.push({
        key: "alterac",
        date: alteracDate.toLocaleDateString(),
      });
    }

    if (row.length > 0) {
      dates.push(row);
    }
    start.setDate(start.getDate() + 28);
    i++;
  }

  document.getElementById("table").style.display = "table";
  const tableBody = document.getElementById("tableBody");
  while (tableBody.firstChild) {
    tableBody.removeChild(this.tableBody.firstChild);
  }
  for (let i = 0; i < dates.length; i++) {
    const rowEl = document.createElement("tr");
    rowEl.appendChild(document.createElement("td"));
    rowEl.appendChild(document.createElement("td"));
    rowEl.appendChild(document.createElement("td"));

    dates[i].forEach((x) => {
      if (x.key === "warsong") {
        rowEl.childNodes.item(0).innerText = x.date;
      } else if (x.key === "arathi") {
        rowEl.childNodes.item(1).innerText = x.date;
      } else if (x.key === "alterac") {
        rowEl.childNodes.item(2).innerText = x.date;
      }
    });
    tableBody.appendChild(rowEl);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  main();
});

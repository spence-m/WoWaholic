function getHolidays(year) {
  const warsongEpoch = new Date(2020, 2, 13);
  const arathiEpoch = new Date(2020, 2, 20);
  const alteracEpoch = new Date(2020, 3, 3);
  const start = new Date(2020, 2, 13);

  let i = 0;
  const dates = [];
  while (start.getFullYear() <= year) {
    const row = [{
      key: "warsong",
      date: "",
    },
    {
      key: "arathi",
      date: "",
    },
    {
      key: "alterac",
      date: "",
    }
    ];
    const warsongDate = new Date(warsongEpoch);
    warsongDate.setDate(warsongDate.getDate() + 28 * i);
    const arathiDate = new Date(arathiEpoch);
    arathiDate.setDate(arathiDate.getDate() + 28 * i);
    const alteracDate = new Date(alteracEpoch);
    alteracDate.setDate(alteracDate.getDate() + 28 * i);

    let added = false;
    if (warsongDate.getFullYear() === year) {
      row[0].date = warsongDate;
      added = true;
    }
    if (arathiDate.getFullYear() === year) {
      row[1].date = arathiDate;
      added = true;
    }
    if (alteracDate.getFullYear() === year) {
      row[2].date = alteracDate;
      added = true;
    }

    if (added) {
      dates.push(row);
    }
    start.setDate(start.getDate() + 28);
    i++;
  }

  return dates;
}

document.addEventListener('alpine:init', () => {
  Alpine.data('holidays', () => ({
    year: new Date().getFullYear(),
    dates() {
      return getHolidays(this.year);
    },
    incrementYear() {
      ++this.year;
    },
    decrementYear() {
      const epochYear = 2020;
      if (this.year > epochYear) {
        --this.year;
      }
    },
    formatDate(date) {
      if (!date) {
        return "";
      }
      return date.toLocaleDateString();
    },
    isHoliday(holidayDate) {
      if (!holidayDate) {
        return false;
      }
      const ends = new Date(holidayDate);
      ends.setDate(ends.getDate() + 3);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today >= holidayDate && today <= ends;
    }
  }))
})

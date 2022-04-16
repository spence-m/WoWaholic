function getClassicHolidays(year, warsongEpoch, arathiEpoch, alteracEpoch, start) {
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

function getBCCHolidays(year) {
  const eyeOfTheStormEpoch = new Date(2021, 5, 4);
  const warsongEpoch = new Date(2021, 5, 11);
  const arathiEpoch = new Date(2021, 5, 18);
  const alteracEpoch = new Date(2021, 5, 25);
  const start = new Date(2021, 5, 4);

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
    },
    {
      key: "eye",
      date: ""
    }
    ];
    const eyeOfTheStormDate = new Date(eyeOfTheStormEpoch);
    eyeOfTheStormDate.setDate(eyeOfTheStormEpoch.getDate() + 28 * i);
    const warsongDate = new Date(warsongEpoch);
    warsongDate.setDate(warsongDate.getDate() + 28 * i);
    const arathiDate = new Date(arathiEpoch);
    arathiDate.setDate(arathiDate.getDate() + 28 * i);
    const alteracDate = new Date(alteracEpoch);
    alteracDate.setDate(alteracDate.getDate() + 28 * i);

    let added = false;
    if (eyeOfTheStormDate.getFullYear() === year) {
      row[0].date = eyeOfTheStormDate;
      added = true;
    }
    if (warsongDate.getFullYear() === year) {
      row[1].date = warsongDate;
      added = true;
    }
    if (arathiDate.getFullYear() === year) {
      row[2].date = arathiDate;
      added = true;
    }
    if (alteracDate.getFullYear() === year) {
      row[3].date = alteracDate;
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

function formatDate(date) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString();
}

function isPast(holidayDate) {
  if (!holidayDate) {
    return false;
  }
  // Holiday lasts ~4 days.
  const holidayEnd = new Date(holidayDate);
  holidayEnd.setDate(holidayEnd.getDate() + 4);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return holidayEnd < today;
}

function isHoliday(holidayDate) {
  if (!holidayDate) {
    return false;
  }
  const ends = new Date(holidayDate);
  ends.setDate(ends.getDate() + 3);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today >= holidayDate && today <= ends;
}

document.addEventListener('alpine:init', () => {
  Alpine.data('classicEraHolidays', () => ({
    year: new Date().getFullYear(),
    dates() {
      const warsongEpoch = new Date(2020, 2, 13);
      const arathiEpoch = new Date(2020, 2, 20);
      const alteracEpoch = new Date(2020, 3, 3);
      const start = new Date(2020, 2, 13);
      return getClassicHolidays(this.year, warsongEpoch, arathiEpoch, alteracEpoch, start);
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
    isDecrementDisabled() {
      const epochYear = 2020;
      return this.year === epochYear;
    },
    formatDate,
    isPast,
    isHoliday
  }));

  Alpine.data('somHolidays', () => ({
    year: new Date().getFullYear(),
    dates() {
      const warsongEpoch = new Date(2021, 10, 19);
      const arathiEpoch = new Date(2021, 10, 26);
      const alteracEpoch = new Date(2021, 11, 10);
      const start = new Date(2021, 10, 19);
      return getClassicHolidays(this.year, warsongEpoch, arathiEpoch, alteracEpoch, start);
    },
    incrementYear() {
      const ends = 2022;
      if (this.year < ends) {
        ++this.year;
      }
    },
    decrementYear() {
      const epochYear = 2021;
      if (this.year > epochYear) {
        --this.year;
      }
    },
    isDecrementDisabled() {
      const epochYear = 2021;
      return this.year === epochYear;
    },
    isIncrementDisabled() {
      const ends = 2022;
      return this.year === ends;
    },
    formatDate,
    isPast,
    isHoliday
  }));

  Alpine.data('bccHolidays', () => ({
    year: new Date().getFullYear(),
    dates() {
      return getBCCHolidays(this.year);
    },
    incrementYear() {
      ++this.year;
    },
    decrementYear() {
      const epochYear = 2021;
      if (this.year > epochYear) {
        --this.year;
      }
    },
    isDecrementDisabled() {
      const epochYear = 2021;
      return this.year === epochYear;
    },
    formatDate,
    isPast,
    isHoliday
  }));
})

export const formatDate = (date) => {
  if (!date) {
    return "";
  }
  
  return date.toLocaleDateString(navigator.language);
};

export const isPast = (holidayDate) => {
  if (!holidayDate) {
    return false;
  }
  // Holiday lasts ~4 days.
  const holidayEnd = new Date(holidayDate);
  holidayEnd.setDate(holidayEnd.getDate() + 4);
  const today = new Date();
  today.setHours(0, 0, 1, 0); // One second past midnight
  return holidayEnd < today;
};

export const isHoliday = (holidayDate) => {
  if (!holidayDate) {
    return false;
  }
  const ends = new Date(holidayDate);
  ends.setDate(ends.getDate() + 3);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today >= holidayDate && today <= ends;
};

export const getClassicHolidays = (
  year,
  warsongEpoch,
  arathiEpoch,
  alteracEpoch,
  start
) => {
  let i = 0;
  const dates = [];
  while (start.getFullYear() <= year) {
    const row = [
      {
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
};

export const getWOTLKHolidays = (year) => {
  const arathiEpoch = new Date(2022, 8, 30);
  const strandEpoch = new Date(2022, 9, 7);
  const alteracEpoch = new Date(2022, 9, 14);
  const eyeOfTheStormEpoch = new Date(2022, 9, 21);
  const warsongEpoch = new Date(2022, 9, 28);
  const start = new Date(arathiEpoch.getTime());

  let i = 0;
  const dates = [];
  while (start.getFullYear() <= year) {
    const row = [
      {
        key: "arathi",
        date: "",
      },
      {
        key: "strand",
        date: "",
      },
      {
        key: "alterac",
        date: "",
      },
      {
        key: "eye",
        date: "",
      },
      {
        key: "warsong",
        date: "",
      },
    ];

    const fiveWeeksInDays = 35;
    const arathiDate = new Date(arathiEpoch);
    arathiDate.setDate(arathiDate.getDate() + fiveWeeksInDays * i);

    const strandDate = new Date(strandEpoch);
    strandDate.setDate(strandDate.getDate() + fiveWeeksInDays * i);

    const alteracDate = new Date(alteracEpoch);
    alteracDate.setDate(alteracDate.getDate() + fiveWeeksInDays * i);

    const eyeOfTheStormDate = new Date(eyeOfTheStormEpoch);
    eyeOfTheStormDate.setDate(
      eyeOfTheStormDate.getDate() + fiveWeeksInDays * i
    );

    const warsongDate = new Date(warsongEpoch);
    warsongDate.setDate(warsongDate.getDate() + fiveWeeksInDays * i);

    let added = false;
    if (arathiDate.getFullYear() === year) {
      row[0].date = arathiDate;
      added = true;
    }
    if (strandDate.getFullYear() === year) {
      row[1].date = strandDate;
      added = true;
    }
    if (alteracDate.getFullYear() === year) {
      row[2].date = alteracDate;
      added = true;
    }
    if (eyeOfTheStormDate.getFullYear() === year) {
      row[3].date = eyeOfTheStormDate;
      added = true;
    }
    if (warsongDate.getFullYear() === year) {
      row[4].date = warsongDate;
      added = true;
    }

    if (added) {
      dates.push(row);
    }
    start.setDate(start.getDate() + fiveWeeksInDays);
    i++;
  }

  return dates;
};

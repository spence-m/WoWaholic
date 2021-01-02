document.addEventListener("DOMContentLoaded", function () {
  const tableBodies = document.getElementsByClassName("js-table-body");
  for (let i = 0; i < tableBodies.length; i++) {
    const body = tableBodies[i];
    const data = body.getElementsByTagName("td");
    let dateToSetActive;
    const now = new Date();
    for (let j = 0; j < data.length; j++) {
      const dateStr = data[j].innerText;

      if (dateStr) {
        const parts = dateStr.split("/");
        const day = parts[0];
        const month = parts[1] - 1;
        const year = parts[2];
        const holidayStartDate = new Date(year, month, day);

        if (isHoliday(holidayStartDate, now) === true) {
          dateToSetActive = data[j];
        }
      }
    }

    if (dateToSetActive) {
      dateToSetActive.classList.add("active");
    }
  }
});

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function isHoliday(holidayDate, dateToCheck) {
  return (
    dateToCheck.getTime() === holidayDate.getTime() ||
    dateToCheck.getTime() === addDays(holidayDate, 1).getTime() ||
    dateToCheck.getTime() === addDays(holidayDate, 2).getTime() ||
    dateToCheck.getTime() === addDays(holidayDate, 3).getTime()
  );
}

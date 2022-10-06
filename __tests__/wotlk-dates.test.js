import { wrathDates } from "../__fixtures__/wotlk-dates.js";
import { getWOTLKHolidays } from "../helpers/date-helper.js";

it("should contain the correct WOTLK dates for 2022", () => {
  const holidays = getWOTLKHolidays(2022);
  for (let i = 0; i < holidays.length; i++) {
    for (let j = 0; j < holidays[i].length; j++) {
      const firstKey = wrathDates[i][j].key;
      const secondKey = holidays[i][j].key;

      const firstDateStr =
        wrathDates[i][j].date === ""
          ? wrathDates[i][j].date
          : wrathDates[i][j].date.toLocaleDateString();
      const secondDateStr =
        holidays[i][j].date === ""
          ? holidays[i][j].date
          : holidays[i][j].date.toLocaleDateString();

      expect(firstKey).toEqual(secondKey);
      expect(firstDateStr).toEqual(secondDateStr);
    }
  }
});

import { wrathDates } from "../__fixtures__/wotlk-dates.js";
import { formatDate, getWOTLKHolidays } from "../helpers/date-helper.js";

let languageGetter;

beforeEach(() => {
  languageGetter = jest.spyOn(window.navigator, "language", "get");
});

it("should format the date correctly for British users", () => {
  languageGetter.mockReturnValue("en-GB");
  const date = new Date(Date.UTC(2022, 9, 15, 0, 0, 0)); // 15/10/2022

  const actual = formatDate(date);
  const expected = "15/10/2022";

  expect(actual).toEqual(expected);
});

it("should format the date correctly for American users", () => {
  languageGetter.mockReturnValue("en-US");
  const date = new Date(Date.UTC(2022, 9, 15, 0, 0, 0)); // 15/10/2022

  const actual = formatDate(date);
  const expected = "10/15/2022";

  expect(actual).toEqual(expected);
});

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

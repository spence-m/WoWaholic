import Alpine from "alpinejs";

import {
  formatDate,
  getClassicHolidays,
  getWOTLKHolidays,
  isHoliday,
  isPast,
} from "./helpers/date-helper.js";

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
  Alpine.data("classicEraHolidays", () => ({
    year: new Date().getFullYear(),
    dates() {
      const warsongEpoch = new Date(2020, 2, 13);
      const arathiEpoch = new Date(2020, 2, 20);
      const alteracEpoch = new Date(2020, 3, 3);
      const start = new Date(2020, 2, 13);
      return getClassicHolidays(
        this.year,
        warsongEpoch,
        arathiEpoch,
        alteracEpoch,
        start
      );
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
    isHoliday,
  }));

  Alpine.data("wotlkHolidays", () => ({
    year: new Date().getFullYear(),
    dates() {
      return getWOTLKHolidays(this.year);
    },
    incrementYear() {
      ++this.year;
    },
    decrementYear() {
      const epochYear = 2022;
      if (this.year > epochYear) {
        --this.year;
      }
    },
    isDecrementDisabled() {
      const epochYear = 2022;
      return this.year === epochYear;
    },
    formatDate,
    isPast,
    isHoliday,
  }));
});

Alpine.start();

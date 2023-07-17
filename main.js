import Alpine from "alpinejs";

import { fetchHelpful, addHelpfulVote } from "./helpers/fetch-helper.js";
import { getHasVoted, setHasVoted } from "./helpers/local-storage-helper";
import { generate } from "./helpers/hardcore-helper.js";

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

  Alpine.data("foundHelpful", () => ({
    hasVoted: getHasVoted("https://wowaholic.com/"),
    text: "",
    async getVotes() {
      this.text = "Be right with ya, laddie...";
      this.votes = await fetchHelpful("go-again.html");
      if (this.hasVoted) {
        if (this.votes === -1) {
          this.text = "Looks like something has gone wrong on our end, laddie";
        } else if (this.votes === 1) {
          this.text = `You are the first Dwarven brethren that found this helpful`;
        } else {
          this.text = `You and ${
            this.votes - 1
          } Dwarven brethren found this helpful`;
        }
      } else {
        if (this.votes === -1) {
          this.text = "Looks like something has gone wrong on our end, laddie";
        } else if (this.votes === 0) {
          this.text = "Be the first to find this helpful, laddie";
        } else {
          this.text = `${this.votes} Dwarven brethren found this helpful`;
        }
      }
    },
    async addVote() {
      if (this.hasVoted) {
        return;
      }
      this.text = "Be right with ya, laddie...";
      this.votes = await addHelpfulVote();
      setHasVoted("https://wowaholic.com/go-again.html");
      this.hasVoted = true;
      if (this.votes === 1) {
        this.text = `You are the first Dwarven brethren that found this helpful`;
      } else {
        this.text = `You and ${
          this.votes - 1
        } Dwarven brethren found this helpful`;
      }
    },
  }));

  Alpine.data("goAgain", () => ({
    choice: null,
    generateChoice() {
      const chosen = generate();
      if (!this.choice) {
        this.choice = chosen;
        return;
      }

      this.choice.id = chosen.id;
      this.choice.faction = chosen.faction;
      this.choice.chosenClass = chosen.chosenClass;
      this.choice.isMale = chosen.isMale;
      this.choice.img = chosen.img;
    },
  }));
});

Alpine.start();

import Alpine from "alpinejs";

import { fetchHelpful, addHelpfulVote } from "./helpers/fetch-helper.js";
import { getHasVoted, setHasVoted } from "./helpers/local-storage-helper";

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
      this.votes = await fetchHelpful();
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
      setHasVoted("https://wowaholic.com/");
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

  Alpine.data("hc", () => ({
    generated: null,
    generate() {
      // 1. Choose faction.
      // 2. Choose race.
      // 3. Choose attributes: gender, skin tone etc.
      // 4. Choose class that said race can be.
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

      const isAlliance = getRandomInt(2) === 0;

      console.log("I am the faction " + isAlliance ? "alliance" : "horde");

      const allianceRaces = ["human", "dwarf", "night_elf", "gnome"];
      const hordeRaces = ["orc", "undead", "tauren", "troll"];

      const race = isAlliance
        ? allianceRaces[getRandomInt(allianceRaces.length)]
        : hordeRaces[getRandomInt(hordeRaces.length)];

      console.log("I am the race: " + race);

      const classes = new Map([
        ["human", ["warrior", "paladin", "rogue", "priest", "mage", "warlock"]],
        ["dwarf", ["warrior", "paladin", "hunter", "priest", "priest"]],
        ["night_elf", ["warrior", "hunter", "rogue", "priest", "druid"]],
        ["gnome", ["warrior", "rogue", "mage", "warlock"]],
        ["orc", ["warrior", "hunter", "rogue", "shaman", "warlock"]],
        ["undead", ["warrior", "rogue", "priest", "mage", "warlock"]],
        ["tauren", ["warrior", "hunter", "shaman", "druid"]],
        ["troll", ["warrior", "hunter", "rogue", "priest", "shaman", "priest"]],
      ]);

      const classesForRace = classes.get(race);
      const chosenClass = classesForRace[getRandomInt(classesForRace.length)];
      console.log("I am the class: " + chosenClass);

      const attributes = new Map([
        [
          "human",
          {
            skinColors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            faces: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            hairStyles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            hairColors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            facialHairs: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
        ],
        [
          "dwarf",
          {
            skinColors: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            faces: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            hairStyles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            hairColors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            facialHairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          },
        ],
        [
          "night_elf",
          {
            skinColors: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            faces: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            hairStyles: [1, 2, 3, 4, 5, 6, 7],
            hairColors: [1, 2, 3, 4, 5, 6, 7, 8],
            facialHairs: [1, 2, 3, 4, 5, 6],
          },
        ],
        [
          "gnome",
          {
            skinColors: [1, 2, 3, 4, 5],
            faces: [1, 2, 3, 4, 5, 6, 7],
            hairStyles: [1, 2, 3, 4, 5, 6, 7],
            hairColors: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            facialHairs: [1, 2, 3, 4, 5, 6, 7, 8],
          },
        ],
        [
          "orc",
          {
            skinColors: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            faces: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            hairStyles: [1, 2, 3, 4, 5, 6, 7],
            hairColors: [1, 2, 3, 4, 5, 6, 7, 8],
            facialHairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          },
        ],
        [
          "undead",
          {
            skinColors: [1, 2, 3, 4, 5, 6],
            faces: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            hairStyles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            hairColors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            features: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
            ],
          },
        ],
        [
          "tauren",
          {
            skinColors: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            ],
            hornStyle: [1, 2, 3, 4, 5, 6, 7, 8],
            facialHairs: [1, 2, 3, 4, 5, 6, 7],
            faces: [1, 2, 3, 4, 5],
            hornColor: [1, 2, 3],
          },
        ],
        [
          "troll",
          {
            skinColors: [1, 2, 3, 4, 5, 6],
            tusks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            hairColor: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            hairStyle: [1, 2, 3, 4, 5, 6],
            face: [1, 2, 3, 4, 6],
          },
        ],
      ]);

      const raceAttributes = attributes.get(race);

      const output = {};
      for (let prop in raceAttributes) {
        output[prop] = {
          label: prop,
          value:
            raceAttributes[prop][getRandomInt(raceAttributes[prop].length)],
        };
      }

      output.race = { label: "race", value: race };
      output.class = { label: "class", value: chosenClass };

      this.generated = output;

      console.log(output);
    },
  }));
});

Alpine.start();

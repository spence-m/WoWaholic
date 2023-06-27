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

      let isMale = getRandomInt(2) === 0;

      console.log("I am the faction " + isAlliance ? "alliance" : "horde");

      const allianceRaces = ["Human", "Dwarf", "Night Elf", "Gnome"];

      let race = allianceRaces[getRandomInt(allianceRaces.length)];

      console.log("I am the race: " + race);

      // TODO: Verify this.
      const classes = new Map([
        ["Human", ["Warrior", "Paladin", "Rogue", "Priest", "Mage", "Warlock"]],
        ["Dwarf", ["Warrior", "Paladin", "Hunter", "Priest", "Rogue"]],
        ["Night Elf", ["Warrior", "Hunter", "Rogue", "Priest", "Druid"]],
        ["Gnome", ["Warrior", "Rogue", "Mage", "Warlock"]],
      ]);

      const classesForRace = classes.get(race);

      const chosenClass = classesForRace[getRandomInt(classesForRace.length)];
      console.log("I am the class: " + chosenClass);

      const attributes = new Map([
        [
          "HumanMale",
          {
            "Skin Color": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            Face: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            "Hair Style": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            "Hair Color": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            "Facial Hair": [1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
        ],
        [
          "HumanFemale",
          {
            "Skin Color": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            Face: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            "Hair Style": [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            ],
            "Hair Color": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            Piercings: [1, 2, 3, 4, 5, 6, 7],
          },
        ],
        [
          "DwarfMale",
          {
            "Skin Color": [1, 2, 3, 4, 5, 6, 7, 8, 9],
            Face: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            "Hair Style": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            "Hair Color": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            "Facial Hair": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          },
        ],
        [
          "DwarfFemale",
          {
            "Skin Color": [1, 2, 3, 4, 5, 6, 7, 8, 9],
            Face: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            "Hair Style": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            "Hair Color": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            Piercings: [1, 2, 3, 4, 5, 6],
          },
        ],
        [
          "Night ElfMale",
          {
            "Skin Color": [1, 2, 3, 4, 5, 6, 7, 8, 9],
            Face: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            "Hair Style": [1, 2, 3, 4, 5, 6, 7],
            "Hair Color": [1, 2, 3, 4, 5, 6, 7, 8],
            "Facial Hair": [1, 2, 3, 4, 5, 6],
          },
        ],
        [
          "Night ElfFemale",
          {
            "Skin Color": [1, 2, 3, 4, 5, 6, 7, 8, 9],
            Face: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            "Hair Style": [1, 2, 3, 4, 5, 6, 7],
            "Hair Color": [1, 2, 3, 4, 5, 6, 7, 8],
            Markings: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
        ],
        [
          "GnomeMale",
          {
            "Skin Color": [1, 2, 3, 4, 5],
            Face: [1, 2, 3, 4, 5, 6, 7],
            "Hair Style": [1, 2, 3, 4, 5, 6, 7],
            "Hair Color": [1, 2, 3, 4, 5, 6, 7, 8, 9],
            "Facial Hair": [1, 2, 3, 4, 5, 6, 7, 8],
          },
        ],
        [
          "GnomeFemale",
          {
            "Skin Color": [1, 2, 3, 4, 5],
            Face: [1, 2, 3, 4, 5, 6, 7],
            "Hair Style": [1, 2, 3, 4, 5, 6, 7],
            "Hair Color": [1, 2, 3, 4, 5, 6, 7, 8, 9],
            Earrings: [1, 2, 3, 4, 5, 6, 7],
          },
        ],
      ]);

      const key = `${race}${isMale ? "Male" : "Female"}`;
      const raceAttributes = attributes.get(key);

      const output = {};

      const genUrl = (prop, value) => {
        if (race === "Human" && prop === "Face" && isMale === true) {
          return `/public/images/human/${
            isMale ? "male" : "female"
          }_face_${value}.png`;
        } else if (
          race === "Human" &&
          prop === "Skin Color" &&
          isMale === true
        ) {
          return `/public/images/human/${
            isMale ? "male" : "female"
          }_skin_${value}.png`;
        } else if (
          race === "Human" &&
          prop === "Hair Style" &&
          isMale === true
        ) {
          return `/public/images/human/${
            isMale ? "male" : "female"
          }_hair_${value}.png`;
        } else if (
          race === "Human" &&
          prop === "Hair Color" &&
          isMale === true
        ) {
          return `/public/images/human/${
            isMale ? "male" : "female"
          }_hair_color_${value}.png`;
        } else if (
          race === "Human" &&
          prop === "Facial Hair" &&
          isMale === true
        ) {
          return `/public/images/human/${
            isMale ? "male" : "female"
          }_facial_hair_${value}.png`;
        }

        if (race === "Human" && prop === "Face" && !isMale) {
          return `/public/images/human/female_face_${value}.png`;
        } else if (race === "Human" && prop === "Skin Color" && !isMale) {
          return `/public/images/human/${
            isMale ? "male" : "female"
          }_skin_${value}.png`;
        } else if (race === "Human" && prop === "Hair Style" && !isMale) {
          return `/public/images/human/${
            isMale ? "male" : "female"
          }_hair_${value}.png`;
        } else if (race === "Human" && prop === "Hair Color" && !isMale) {
          return `/public/images/human/${
            isMale ? "male" : "female"
          }_hair_color_${value}.png`;
        } else if (race === "Human" && prop === "Piercings" && !isMale) {
          return `/public/images/human/female_piercings_${value}.png`;
        }

        if (race === "Dwarf" && prop === "Face" && isMale) {
          return `/public/images/dwarf/male_face_${value}.png`;
        } else if (race === "Dwarf" && prop === "Skin Color" && isMale) {
          return `/public/images/dwarf/male_skin_${value}.png`;
        } else if (race === "Dwarf" && prop === "Hair Style" && isMale) {
          return `/public/images/dwarf/male_hair_${value}.png`;
        } else if (race === "Dwarf" && prop === "Hair Color" && isMale) {
          return `/public/images/dwarf/male_hair_color_${value}.png`;
        } else if (race === "Dwarf" && prop === "Facial Hair" && isMale) {
          return `/public/images/dwarf/male_facial_hair_${value}.png`;
        }

        if (race === "Dwarf" && prop === "Face" && !isMale) {
          return `/public/images/dwarf/female_face_${value}.png`;
        } else if (race === "Dwarf" && prop === "Skin Color" && !isMale) {
          return `/public/images/dwarf/female_skin_${value}.png`;
        } else if (race === "Dwarf" && prop === "Hair Style" && !isMale) {
          return `/public/images/dwarf/female_hair_${value}.png`;
        } else if (race === "Dwarf" && prop === "Hair Color" && !isMale) {
          return `/public/images/dwarf/female_hair_color_${value}.png`;
        } else if (race === "Dwarf" && prop === "Piercings" && !isMale) {
          return `/public/images/dwarf/female_piercings_${value}.png`;
        }

        if (race === "Night Elf" && prop === "Face" && isMale) {
          return `/public/images/night_elf/male_face_${value}.png`;
        } else if (race === "Night Elf" && prop === "Skin Color" && isMale) {
          return `/public/images/night_elf/male_skin_color_${value}.png`;
        } else if (race === "Night Elf" && prop === "Hair Style" && isMale) {
          return `/public/images/night_elf/male_hair_${value}.png`;
        } else if (race === "Night Elf" && prop === "Hair Color" && isMale) {
          return `/public/images/night_elf/male_hair_color_${value}.png`;
        } else if (race === "Night Elf" && prop === "Facial Hair" && isMale) {
          return `/public/images/night_elf/male_facial_hair_${value}.png`;
        }

        if (race === "Night Elf" && prop === "Face" && !isMale) {
          return `/public/images/night_elf/female_face_${value}.png`;
        } else if (race === "Night Elf" && prop === "Skin Color" && !isMale) {
          return `/public/images/night_elf/female_skin_color_${value}.png`;
        } else if (race === "Night Elf" && prop === "Hair Style" && !isMale) {
          return `/public/images/night_elf/female_hair_${value}.png`;
        } else if (race === "Night Elf" && prop === "Hair Color" && !isMale) {
          return `/public/images/night_elf/female_hair_color_${value}.png`;
        } else if (race === "Night Elf" && prop === "Markings" && !isMale) {
          return `/public/images/night_elf/female_markings_${value}.png`;
        }

        if (race === "Gnome" && prop === "Face" && isMale) {
          return `/public/images/gnome/male_face_${value}.png`;
        } else if (race === "Gnome" && prop === "Skin Color" && isMale) {
          return `/public/images/gnome/male_skin_${value}.png`;
        } else if (race === "Gnome" && prop === "Hair Style" && isMale) {
          return `/public/images/gnome/male_hair_${value}.png`;
        } else if (race === "Gnome" && prop === "Hair Color" && isMale) {
          return `/public/images/gnome/male_hair_color_${value}.png`;
        } else if (race === "Gnome" && prop === "Facial Hair" && isMale) {
          return `/public/images/gnome/male_facial_hair_${value}.png`;
        }

        if (race === "Gnome" && prop === "Face" && !isMale) {
          return `/public/images/gnome/female_face_${value}.png`;
        } else if (race === "Gnome" && prop === "Skin Color" && !isMale) {
          return `/public/images/gnome/female_skin_color_${value}.png`;
        } else if (race === "Gnome" && prop === "Hair Style" && !isMale) {
          return `/public/images/gnome/female_hairstyle_${value}.png`;
        } else if (race === "Gnome" && prop === "Hair Color" && !isMale) {
          return `/public/images/gnome/female_hair_color_${value}.png`;
        } else if (race === "Gnome" && prop === "Earrings" && !isMale) {
          return `/public/images/gnome/female_earrings_${value}.png`;
        }

        if (race === "Human" && prop === "Class") {
          if (chosenClass === "Warrior") {
            return `/public/images/priest.png`;
          } else if (chosenClass === "Paladin") {
            return `/public/images/paladin.png`;
          } else if (chosenClass === "Rogue") {
            return `/public/images/rogue.png`;
          } else if (chosenClass === "Priest") {
            return `/public/images/priest.png`;
          } else if (chosenClass === "Mage") {
            return `/public/images/mage.png`;
          } else if (chosenClass === "Warlock") {
            return `/public/images/warlock.png`;
          }
        } else if (race === "Human" && prop === "Race") {
          return `/public/images/human.png`;
        } else if (race === "Dwarf" && prop === "Race") {
          return `/public/images/dwarf.png`;
        } else if (race === "Night Elf" && prop === "Race") {
          return `/public/images/night_elf.png`;
        } else if (race === "Gnome" && prop === "Race") {
          return `/public/images/gnome.png`;
        } else if (race === "Orc" && prop === "Race") {
          return `/public/images/orc.png`;
        } else if (race === "Undead" && prop === "Race") {
          return `/public/images/undead.png`;
        } else if (race === "Tauren" && prop === "Race") {
          return `/public/images/tauren.png`;
        } else if (race === "Troll" && prop === "Race") {
          return `/public/images/troll.png`;
        }

        if (race === "Dwarf" && prop === "Face") {
          return `/public/images/dwarf/${
            isMale ? "male" : "female"
          }_face_${value}.png`;
        } else if (race === "Dwarf" && prop === "Skin Color") {
          return `/public/images/dwarf/${
            isMale ? "male" : "female"
          }_skin_${value}.png`;
        } else if (race === "Dwarf" && prop === "Hair Style") {
          return `/public/images/dwarf/${
            isMale ? "male" : "female"
          }_hair_${value}.png`;
        } else if (race === "Dwarf" && prop === "Hair Color") {
          return `/public/images/dwarf/${
            isMale ? "male" : "female"
          }_hair_color_${value}.png`;
        } else if (
          race === "Dwarf" &&
          prop === "Facial Hair" &&
          isMale === true
        ) {
          return `/public/images/dwarf/${
            isMale ? "male" : "female"
          }_facial_hair_${value}.png`;
        }

        return "https://placehold.co/168x168";
      };

      output.race = {
        label: "Race",
        value: race,
        src: genUrl("Race"),
      };
      output.class = {
        label: "Class",
        value: chosenClass,
        src: genUrl("Class"),
      };

      for (let prop in raceAttributes) {
        const value =
          raceAttributes[prop][getRandomInt(raceAttributes[prop].length)];
        output[prop] = {
          label: prop,
          value,
          src: genUrl(prop, value),
        };
      }

      // if (race === "human") {
      //   output.image = {
      //     label: "src",
      //     value: "human_face_" + output.faces.value,
      //   };
      // }

      this.generated = output;

      console.log(output);
    },
  }));
});

Alpine.start();

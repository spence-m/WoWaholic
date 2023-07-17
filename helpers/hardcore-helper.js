export const generate = () => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const isMale = getRandomInt(2) === 0;

  const races = [
    {
      id: "Dwarf",
      faction: "Alliance",
      classes: ["Hunter", "Paladin", "Priest", "Rogue", "Warrior"],
      images: [
        "/images/races/dwarf-male.png",
        "/images/races/dwarf-female.png",
      ],
    },
    {
      id: "Gnome",
      faction: "Alliance",
      classes: ["Mage", "Rogue", "Warlock", "Warrior"],
      images: [
        "/images/races/gnome-male.png",
        "/images/races/gnome-female.png",
      ],
    },
    {
      id: "Human",
      faction: "Alliance",
      classes: ["Mage", "Paladin", "Priest", "Rogue", "Warlock", "Warrior"],
      images: [
        "/images/races/human-male.png",
        "/images/races/human-female.png",
      ],
    },
    {
      id: "Night Elf",
      faction: "Alliance",
      classes: ["Druid", "Hunter", "Priest", "Rogue", "Warrior"],
      images: [
        "/images/races/night-elf-male.png",
        "/images/races/night-elf-female.png",
      ],
    },
    {
      id: "Orc",
      faction: "Horde",
      classes: ["Hunter", "Rogue", "Shaman", "Warlock", "Warrior"],
      images: ["/images/races/orc-male.png", "/images/races/orc-female.png"],
    },
    {
      id: "Tauren",
      faction: "Horde",
      classes: ["Druid", "Hunter", "Shaman", "Warrior"],
      images: [
        "/images/races/tauren-male.png",
        "/images/races/tauren-female.png",
      ],
    },
    {
      id: "Troll",
      faction: "Horde",
      classes: ["Hunter", "Mage", "Priest", "Rogue", "Shaman", "Warrior"],
      images: [
        "/images/races/troll-male.png",
        "/images/races/troll-female.png",
      ],
    },
    {
      id: "Undead",
      faction: "Horde",
      classes: ["Mage", "Priest", "Rogue", "Warlock", "Warrior"],
      images: [
        "/images/races/undead-male.png",
        "/images/races/undead-female.png",
      ],
    },
  ];

  const character = races[getRandomInt(races.length)];
  const chosenClass = character.classes[getRandomInt(character.classes.length)];

  delete character.classes;
  const img = character.images[isMale ? 0 : 1];
  delete character.images;
  const choice = {
    ...character,
    chosenClass,
    isMale,
    img,
  };
  
  return choice;
};

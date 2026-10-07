import lionImg from "./lion.jpg";
import gorillaImg from "./gorila.jpg";
import zebraImg from "./zebra.jpg";

const animals = [
  {
    name: "Lion",
    scientificName: "Panthera leo",
    size: 140,
    diet: ["meat"],
    image: lionImg,
  },
  {
    name: "Gorilla",
    scientificName: "Gorilla beringei",
    size: 205,
    diet: ["plants", "insects"],
    image: gorillaImg,
    additional: {
      notes:
        "This is the eastern gorilla. There is also a western gorilla that is a different species.",
    },
  },
  {
    name: "Zebra",
    scientificName: "Equus quagga",
    size: 322,
    diet: ["plants"],
    image: zebraImg,
    additional: {
      notes: "There are three different species of zebra.",
      link: "https://en.wikipedia.org/wiki/Zebra",
    },
  },
];

export default animals;

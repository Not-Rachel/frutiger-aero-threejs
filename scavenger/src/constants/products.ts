const bagImg = "/scavenger/assets/product-images/bagDetail.png";
const strawImg = "/scavenger/assets/product-images/filterstrawTorn.png";
const balmImg = "/scavenger/assets/product-images/balmTorn.png";
const coordImg = "/scavenger/assets/product-images/coordTorn.png";
const toteImg = "/scavenger/assets/product-images/toteTorn.png";
const fireImg = "/scavenger/assets/product-images/firestarter.png";
const multitoolImg = "/scavenger/assets/product-images/multitoolTorn.png";

export const products = [
  {
    key: 0,
    image: bagImg,
    name: "Elite Hiking Bag",
    category: ["hiking", "camping"],
    text: "High-performance Backpack for hiking, camping, 2 liters of storage",
    model: "/scavenger/glb/betterbag.glb",
  },
  {
    key: 1,
    image: strawImg,
    name: "Sand Filteration Straw",
    category: ["hiking", "camping", "survival"],
    text: "Take any dirty stream or puddle and slurp away with out amazing filtration technology.",
    model: "/scavenger/glb/strawFinal.glb",
  },
  {
    key: 2,
    image: balmImg,
    name: "Climber's Hand Balm",
    category: ["climbing"],
    text: "Cracked and sore hands are no more! With this spectacular formula you can recover your aching hands in no time",
    model: "/scavenger/glb/balmFinal.glb",
  },
  {
    key: 3,
    image: coordImg,
    name: "Nylon Utility Coord with Carabiner",
    category: ["camping"],
    text: "You will pracically fly up those cliff faces with our extra sturdy rope created in-house with our own patented material",
    model: "/scavenger/glb/coordFinal.glb",
  },
  {
    key: 4,
    image: toteImg,
    name: "Recycled tote bag made with ethically sourced leather",
    category: ["hiking"],
    text: "Made with incredible carrying capacity of 3 liters, take this on any hike and have you space needs met",
    model: "/scavenger/glb/toteFinal.glb",
  },
  {
    key: 5,
    image: fireImg,
    name: "Water-proof Firestarting Tinder",
    category: ["survival", "camping"],
    text: "Start fires anywhere at anytime, rain or shine.",
    model: null,
  },
  {
    key: 6,
    image: multitoolImg,
    name: "Water-proof Firestarting Tinder",
    category: ["hiking"],
    text: "Start fires anywhere at anytime, rain or shine.",
    model: "/scavenger/glb/MultitoolFinal.glb",
  },
];

// Preload each img
if (typeof window !== "undefined") {
  products.forEach(({ image }) => {
    const img = new Image();
    img.src = image;
  });
}

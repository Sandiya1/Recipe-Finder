const STOP_WORDS = [
  "i", "have", "want", "with", "and", "or", "some",
  "make", "cook", "something", "using", "recipe",
  "please", "me"
];

const PLURAL_MAP = {
  tomatoes: "tomato",
  onions: "onion",
  potatoes: "potato",
  eggs: "egg",
  chilies: "chili"
};
const INTENTS = {
  spicy: ["chili", "pepper"],
  healthy: ["salad", "grilled"],
  sweet: ["dessert"]
};

export function parseIngredients(input) {
  if (!input) return { include: [], exclude: [] };

  const words = input
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/);

  const include = [];
  const exclude = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    // handle "no egg", "without sugar"
    if (word === "no" || word === "without") {
      const next = words[i + 1];
      if (next) exclude.push(normalize(next));
      continue;
    }

    if (STOP_WORDS.includes(word)) continue;

    include.push(normalize(word));
  }

  return {
    include: [...new Set(include)],
    exclude: [...new Set(exclude)],
  };
}

function normalize(word) {
  return PLURAL_MAP[word] || word;
}

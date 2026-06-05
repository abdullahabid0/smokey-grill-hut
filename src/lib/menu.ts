export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
  emoji: string;
  tag?: string;
};

export const CATEGORIES = [
  "Burgers",
  "Shawarma",
  "Platter",
  "Chicken",
  "Paratha Rolls",
  "Fries",
  "Sandwich",
  "Wrap",
  "Pasta",
  "Extra Add Ons",
] as const;
export type Category = (typeof CATEGORIES)[number];

const mk = (name: string, price: number, category: Category, emoji: string, tag?: string): Product => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  name, price, category, emoji, tag,
});

export const PRODUCTS: Product[] = [
  // Burgers
  mk("Zinger Burger", 300, "Burgers", "🍔", "Bestseller"),
  mk("Zinger Cheese Burger", 350, "Burgers", "🍔"),
  mk("Double Zinger With Cheese", 550, "Burgers", "🍔", "Hot"),
  mk("Chicken Fried Patty Burger", 280, "Burgers", "🍔"),
  mk("Chicken Fried Patty With Cheese", 350, "Burgers", "🍔"),
  mk("Chicken Fried Double Patty With Cheese", 450, "Burgers", "🍔"),
  mk("Chicken Patty Burger", 300, "Burgers", "🍔"),
  mk("Chicken Patty Burger With Cheese", 350, "Burgers", "🍔"),
  mk("Chicken Patty Signature Burger", 400, "Burgers", "🍔", "Signature"),
  mk("Chicken Grill Burger", 300, "Burgers", "🍔"),
  mk("Chicken Tikka Burger", 300, "Burgers", "🍔"),
  mk("Chicken Tikka Cheese Burger", 350, "Burgers", "🍔"),
  mk("Grill Burger With Jalapeno", 350, "Burgers", "🌶️"),
  mk("Grill Hut Signature Burger", 350, "Burgers", "🔥", "Signature"),
  mk("Chicken Burger", 300, "Burgers", "🍔"),
  mk("Chicken Cheese Burger", 350, "Burgers", "🍔"),
  mk("Beef Burger", 400, "Burgers", "🥩"),
  mk("Beef Burger With Cheese", 450, "Burgers", "🥩"),
  mk("Smokey Beef Burger", 500, "Burgers", "🥩", "Smokey"),
  // Shawarma
  mk("Chicken Shawarma", 180, "Shawarma", "🌯", "Bestseller"),
  mk("Chicken Cheese Shawarma", 250, "Shawarma", "🌯"),
  mk("Chicken Double Cheese Shawarma", 320, "Shawarma", "🌯"),
  mk("Grill Hut Signature Shawarma", 320, "Shawarma", "🔥", "Signature"),
  mk("Zinger Shawarma", 300, "Shawarma", "🌯"),
  mk("Zinger Shawarma With Cheese", 350, "Shawarma", "🌯"),
  mk("Beef Shawarma", 400, "Shawarma", "🥩"),
  mk("Beef Shawarma With Cheese", 450, "Shawarma", "🥩"),
  // Platter
  mk("Chicken Shawarma Platter With 2 Breads", 450, "Platter", "🍽️"),
  mk("Chicken Shawarma Platter With 3 Breads", 500, "Platter", "🍽️"),
  mk("Chicken Cheese Platter Shawarma", 550, "Platter", "🍽️"),
  mk("Signature Shawarma Platter (Cheese, Jalapenos, Black Olives)", 650, "Platter", "🍽️", "Signature"),
  // Chicken
  mk("Nuggets 6pc", 300, "Chicken", "🍗"),
  mk("Zinger 1pc", 240, "Chicken", "🍗"),
  mk("Hot Wings 6pc", 300, "Chicken", "🔥"),
  mk("Drum Stick 2pc", 350, "Chicken", "🍗"),
  // Paratha Rolls
  mk("Chicken Paratha Roll", 250, "Paratha Rolls", "🫓"),
  mk("Chicken Cheese Paratha Roll", 320, "Paratha Rolls", "🫓"),
  mk("Zinger Paratha Roll", 350, "Paratha Rolls", "🫓"),
  mk("Zinger Cheese Paratha Roll", 420, "Paratha Rolls", "🫓"),
  mk("Beef Paratha Roll", 400, "Paratha Rolls", "🥩"),
  mk("Beef Cheese Paratha Roll", 450, "Paratha Rolls", "🥩"),
  // Fries
  mk("Plain Fries", 150, "Fries", "🍟"),
  mk("Loaded Fries", 350, "Fries", "🍟", "Hot"),
  mk("Smokey Signature Fries", 450, "Fries", "🔥", "Signature"),
  // Sandwich
  mk("Club Sandwich", 350, "Sandwich", "🥪"),
  mk("Smokey Grill Sandwich", 380, "Sandwich", "🥪"),
  mk("Grill Hut Signature Sandwich (Cheese, Jalapenos, Olives)", 550, "Sandwich", "🥪", "Signature"),
  mk("Beef Sandwich (Cheese, Jalapenos, Olives)", 750, "Sandwich", "🥩"),
  // Wrap
  mk("Chicken Wrap", 370, "Wrap", "🌯"),
  mk("Chicken Cheese Wrap", 420, "Wrap", "🌯"),
  mk("Zinger Wrap", 400, "Wrap", "🌯"),
  mk("Zinger Cheese Wrap", 450, "Wrap", "🌯"),
  mk("Smokey Signature Wrap", 550, "Wrap", "🔥", "Signature"),
  mk("Crispy Wrap", 500, "Wrap", "🌯"),
  mk("Beef Wrap", 800, "Wrap", "🥩"),
  mk("Beef Wrap Cheese", 850, "Wrap", "🥩"),
  // Pasta
  mk("Fettuccine Alfredo Pasta", 550, "Pasta", "🍝"),
  // Extra
  mk("Jalapenos", 30, "Extra Add Ons", "🌶️"),
  mk("Black Olives", 30, "Extra Add Ons", "🫒"),
  mk("Cheese", 70, "Extra Add Ons", "🧀"),
  mk("Smokey Signature Sauce", 30, "Extra Add Ons", "🥫"),
];

export type Deal = { id: string; title: string; subtitle: string; price: number; emoji: string; badge: string };
export const DEALS: Deal[] = [
  { id: "student-deal", title: "Student Deal", subtitle: "Zinger Burger + Fries + Drink", price: 499, emoji: "🎓", badge: "Most Popular" },
  { id: "family-feast", title: "Family Feast", subtitle: "4 Burgers + 2 Shawarmas + Large Fries + 1.5L Drink", price: 2499, emoji: "👨‍👩‍👧", badge: "Save Big" },
  { id: "midnight-craving", title: "Midnight Craving", subtitle: "Signature Burger + Loaded Fries + Drink", price: 850, emoji: "🌙", badge: "Late Night" },
];

export const BRAND = {
  name: "Smokey Grill Hut",
  phone: "0312 4870904",
  whatsapp: "923124870904",
  hours: "5:00 PM – 4:00 AM",
  delivery: "RS 100 / Free Nearby",
  address: "Shop No 7, Saleem Complex, near Kashmir Bakers, Block Q Commercial Area, Model Town, Lahore",
};

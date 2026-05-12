const products = [
  {
    title: "Hydrating Face Serum",
    description: "A lightweight serum that deeply hydrates and nourishes the skin with hyaluronic acid and vitamin E.",
    price: 45.99,
    category: "Skincare",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    stock: 50,
    ingredients: "Hyaluronic Acid, Vitamin E, Aloe Vera, Glycerin"
  },
  {
    title: "Matte Lipstick - Ruby Red",
    description: "Long-lasting matte lipstick in a classic ruby red shade. Perfect for everyday wear.",
    price: 24.99,
    category: "Makeup",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
    stock: 30,
    ingredients: "Castor Oil, Beeswax, Pigments, Vitamin E"
  },
  {
    title: "Rose Water Toner",
    description: "Gentle toner infused with pure rose water to balance pH and refresh the skin.",
    price: 18.99,
    category: "Skincare",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400",
    stock: 75,
    ingredients: "Rose Water, Witch Hazel, Aloe Vera"
  },
  {
    title: "Volumizing Mascara",
    description: "Dramatic volume and length for your lashes with this waterproof formula.",
    price: 22.99,
    category: "Makeup",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
    stock: 40,
    ingredients: "Beeswax, Carnauba Wax, Vitamin E, Pigments"
  },
  {
    title: "Anti-Aging Night Cream",
    description: "Rich night cream with retinol and peptides to reduce fine lines and improve skin texture.",
    price: 65.99,
    category: "Skincare",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    stock: 25,
    ingredients: "Retinol, Peptides, Hyaluronic Acid, Shea Butter"
  },
  {
    title: "Blush Palette - Natural Glow",
    description: "Six shades of blush for a natural, healthy glow. Perfect for all skin tones.",
    price: 32.99,
    category: "Makeup",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
    stock: 35,
    ingredients: "Mica, Titanium Dioxide, Iron Oxides, Zinc Oxide"
  },
  {
    title: "Cleansing Oil",
    description: "Gentle oil cleanser that removes makeup and impurities without stripping natural oils.",
    price: 28.99,
    category: "Skincare",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400",
    stock: 60,
    ingredients: "Jojoba Oil, Sweet Almond Oil, Vitamin E, Lavender Oil"
  },
  {
    title: "Eyeshadow Palette - Smoky Eyes",
    description: "12 matte shades perfect for creating smoky eye looks. Long-lasting and blendable.",
    price: 42.99,
    category: "Makeup",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
    stock: 20,
    ingredients: "Talc, Mica, Silica, Magnesium Stearate"
  },
  {
    title: "Vitamin C Brightening Serum",
    description: "Brighten and even skin tone with this potent vitamin C serum. Reduces dark spots and hyperpigmentation.",
    price: 52.99,
    category: "Skincare",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    stock: 45,
    ingredients: "Vitamin C, Hyaluronic Acid, Vitamin E, Ferulic Acid"
  },
  {
    title: "Setting Powder - Translucent",
    description: "Invisible setting powder that controls shine and sets makeup for all-day wear.",
    price: 26.99,
    category: "Makeup",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
    stock: 55,
    ingredients: "Silica, Rice Powder, Zinc Oxide, Vitamin E"
  },
  {
    title: "Exfoliating Face Scrub",
    description: "Gentle exfoliating scrub with natural ingredients to remove dead skin cells and reveal brighter skin.",
    price: 19.99,
    category: "Skincare",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400",
    stock: 80,
    ingredients: "Sugar, Coconut Oil, Essential Oils, Vitamin E"
  },
  {
    title: "Liquid Foundation - Medium Coverage",
    description: "Buildable coverage foundation that matches various skin tones. Lightweight and non-comedogenic.",
    price: 38.99,
    category: "Makeup",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
    stock: 28,
    ingredients: "Water, Glycerin, Titanium Dioxide, Iron Oxides"
  },
  {
    title: "Hair Oil Treatment",
    description: "Nourishing hair oil that tames frizz, adds shine, and protects from heat damage.",
    price: 29.99,
    category: "Hair Care",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    stock: 40,
    ingredients: "Argan Oil, Jojoba Oil, Vitamin E, Lavender Oil"
  },
  {
    title: "Nail Polish - French Manicure",
    description: "Classic French manicure nail polish set for professional-looking nails at home.",
    price: 16.99,
    category: "Nails",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
    stock: 65,
    ingredients: "Butyl Acetate, Ethyl Acetate, Nitrocellulose, Acetyl Tributyl Citrate"
  },
  {
    title: "Body Lotion - Lavender Scent",
    description: "Moisturizing body lotion with calming lavender scent. Absorbs quickly without greasiness.",
    price: 21.99,
    category: "Body Care",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400",
    stock: 70,
    ingredients: "Shea Butter, Aloe Vera, Lavender Oil, Vitamin E"
  }
];

const adminUser = {
  name: 'Admin User',
  email: 'admin@lumierebeauty.com',
  password: 'admin123',
  role: 'admin'
};

const categories = [
  "Skincare",
  "Makeup",
  "Hair Care",
  "Nails",
  "Body Care"
];

console.log('Sample Data Structure:');
console.log('======================');
console.log('Admin User:', adminUser);
console.log('Categories:', categories);
console.log('Products Count:', products.length);
console.log('Sample Product:', products[0]);

module.exports = { products, adminUser, categories };
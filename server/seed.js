const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

// Load env vars
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 5,
      family: 4
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('Please check your MONGO_URI in .env file');
    console.log('Current URI:', process.env.MONGO_URI ? 'Set' : 'Not set');
    throw error;
  }
};

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
  },
  {
    title: "Charcoal Face Mask",
    description: "Deeply detoxifies and cleanses pores with activated charcoal and bentonite clay.",
    price: 23.50,
    category: "Skincare",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
    stock: 45,
    ingredients: "Activated Charcoal, Bentonite Clay, Tea Tree Oil"
  },
  {
    title: "Gel Eyeliner - Jet Black",
    description: "Ultra-smooth gel eyeliner for precise lines and bold looks. Waterproof and smudge-proof.",
    price: 15.99,
    category: "Makeup",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
    stock: 60,
    ingredients: "Isododecane, Polyethylene, Cyclopentasiloxane"
  },
  {
    title: "Peppermint Lip Balm",
    description: "Soothing lip balm with peppermint oil for a refreshing and hydrating experience.",
    price: 5.99,
    category: "Lip Care",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
    stock: 120,
    ingredients: "Beeswax, Coconut Oil, Peppermint Essential Oil"
  },
  {
    title: "Moisturizing Shampoo",
    description: "Gentle shampoo that hydrates and restores dry hair with argan oil and silk proteins.",
    price: 18.50,
    category: "Hair Care",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400",
    stock: 55,
    ingredients: "Argan Oil, Silk Proteins, Aloe Vera"
  },
  {
    title: "Silk Pillowcase - Pearl White",
    description: "100% mulberry silk pillowcase to prevent hair breakage and skin wrinkles.",
    price: 34.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    stock: 30,
    ingredients: "100% Mulberry Silk"
  }
];

const importData = async () => {
  try {
    // Wait for mongoose to connect
    if (mongoose.connection.readyState !== 1) {
      console.log('Waiting for database connection...');
      await new Promise((resolve, reject) => {
        mongoose.connection.once('connected', resolve);
        mongoose.connection.once('error', reject);
        setTimeout(() => reject(new Error('Connection timeout')), 30000);
      });
    }

    console.log('Database connected, proceeding with data import...');

    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@lumierebeauty.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Admin user created');

    // Create regular users
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user'
    });
    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123',
      role: 'user'
    });
    console.log('Regular users created');

    // Create products
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} Products imported successfully`);

    // Create a few orders
    await Order.create([
      {
        user: user1._id,
        items: [
          {
            product: createdProducts[0]._id,
            title: createdProducts[0].title,
            price: createdProducts[0].price,
            image: createdProducts[0].image,
            quantity: 2
          },
          {
            product: createdProducts[1]._id,
            title: createdProducts[1].title,
            price: createdProducts[1].price,
            image: createdProducts[1].image,
            quantity: 1
          }
        ],
        total: (createdProducts[0].price * 2) + createdProducts[1].price,
        status: 'Delivered'
      },
      {
        user: user2._id,
        items: [
          {
            product: createdProducts[5]._id,
            title: createdProducts[5].title,
            price: createdProducts[5].price,
            image: createdProducts[5].image,
            quantity: 1
          }
        ],
        total: createdProducts[5].price,
        status: 'Pending'
      }
    ]);
    console.log('Sample orders created');

    console.log('Data Import Success!');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error('Error destroying data:', error);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();
  await importData();
};

const runDestroy = async () => {
  await connectDB();
  await destroyData();
};

if (process.argv[2] === '-d') {
  runDestroy();
} else {
  run();
}
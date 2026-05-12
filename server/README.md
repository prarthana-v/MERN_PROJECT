# Lumiere Beauty Server

Backend API for the Lumiere Beauty e-commerce application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

3. Make sure MongoDB is running and accessible.

## Database Seeding

To populate the database with sample data:

```bash
# Seed the database with sample products and admin user
npm run seed

# Destroy all data (use with caution)
npm run destroy
```

### Sample Data Includes:
- **Admin User**: `admin@lumierebeauty.com` / `admin123`
- **15 Products** across 5 categories:
  - Skincare (6 products)
  - Makeup (6 products)
  - Hair Care (1 product)
  - Nails (1 product)
  - Body Care (1 product)

### Categories:
- Skincare
- Makeup
- Hair Care
- Nails
- Body Care

## Running the Server

```bash
npm start
```

The server will run on `http://localhost:4000` (or the port specified in .env).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products/all` - Get all products
- `GET /api/products/get/:id` - Get product by ID
- `POST /api/products/add` - Add new product (Admin only)
- `PUT /api/products/update/:id` - Update product (Admin only)
- `DELETE /api/products/delete/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders/myorders` - Get user's orders
- `GET /api/orders/all` - Get all orders (Admin only)
- `PUT /api/orders/update/:id/status` - Update order status (Admin only)

### Admin
- `GET /api/admin/stats` - Get dashboard statistics (Admin only)

## Environment Variables

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Server port (default: 4000)

## Troubleshooting

If you encounter MongoDB connection issues:

1. Verify your `MONGO_URI` is correct
2. Check if your MongoDB cluster is accessible
3. Ensure your IP address is whitelisted in MongoDB Atlas
4. Try using a local MongoDB instance: `mongodb://localhost:27017/lumiere_beauty`
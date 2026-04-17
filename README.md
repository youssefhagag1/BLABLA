# BLABLA - E-Commerce API

A comprehensive Node.js/Express-based e-commerce REST API with user authentication, product management, shopping cart, orders, and Stripe payment integration.

## Features

- **User Authentication**: JWT-based authentication and authorization
- **Product Management**: Browse, filter, sort, and search products
- **Categories & Brands**: Organize products by categories and brands
- **Shopping Cart**: Add/remove items, manage cart quantities
- **Orders**: Create cash orders and card orders with Stripe payment processing
- **Reviews & Ratings**: User reviews and product ratings
- **Wishlist**: Save favorite products
- **Coupons**: Apply discount coupons to orders
- **Security**:
  - CORS protection
  - HPP (HTTP Parameter Pollution) protection with whitelisted keys
  - Helmet for HTTP headers security
  - Rate limiting (100 requests per 15 minutes)
  - Response compression
- **Payment Integration**: Stripe checkout sessions and webhook handling
- **Admin Features**: Manage products, categories, orders, and coupons
- **Error Handling**: Centralized error handling middleware
- **Logging**: Morgan request logging in development mode

## Tech Stack

- **Runtime**: Node.js v22+
- **Framework**: Express.js v5.2+
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Payment**: Stripe SDK
- **Validation**: express-validator
- **Security**: cors, compression, hpp, helmet, express-rate-limit
- **File Upload**: Multer with Sharp for image processing
- **Email**: Nodemailer
- **Development**: Nodemon, Morgan

## Installation

### Prerequisites

- Node.js v22+
- MongoDB running locally or remotely
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/youssefhagag1/BLABLA.git
   cd BLABLA
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `config.env` file in the root directory:

   ```env
   PORT=8000
   NODE_ENV=development
   MONGO_URI=mongodb://127.0.0.1:27017/BLABLA
   BASE_URL=http://localhost:8000
   SECRET_KEY=your_secret_key_here
   EXPIRES_DATE=90d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=465
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   STRIPE_SECRET=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. **Start the development server**

   ```bash
   npm run start:dev
   ```

5. **Start the production server**
   ```bash
   npm run start:prod
   ```

## API Endpoints

### Authentication

- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/forgotPassword` - Request password reset
- `POST /api/v1/auth/resetPassword/:token` - Reset password with token
- `PUT /api/v1/auth/changePassword/:id` - Change password (protected)

### Products

- `GET /api/v1/products` - Get all products (with filtering, sorting, searching)
- `GET /api/v1/products/:id` - Get product details
- `POST /api/v1/products` - Create product (admin)
- `PUT /api/v1/products/:id` - Update product (admin)
- `DELETE /api/v1/products/:id` - Delete product (admin)

### Categories

- `GET /api/v1/categories` - Get all categories
- `GET /api/v1/categories/:id` - Get category details
- `POST /api/v1/categories` - Create category (admin)
- `PUT /api/v1/categories/:id` - Update category (admin)
- `DELETE /api/v1/categories/:id` - Delete category (admin)

### Sub-Categories

- `GET /api/v1/subCategories` - Get all sub-categories
- `POST /api/v1/subCategories` - Create sub-category (admin)
- `PUT /api/v1/subCategories/:id` - Update sub-category (admin)
- `DELETE /api/v1/subCategories/:id` - Delete sub-category (admin)

### Brands

- `GET /api/v1/brands` - Get all brands
- `POST /api/v1/brands` - Create brand (admin)
- `PUT /api/v1/brands/:id` - Update brand (admin)
- `DELETE /api/v1/brands/:id` - Delete brand (admin)

### Cart

- `GET /api/v1/cart` - Get user cart (protected)
- `POST /api/v1/cart` - Add item to cart (protected)
- `DELETE /api/v1/cart/:itemId` - Remove item from cart (protected)
- `PUT /api/v1/cart/:itemId` - Update item quantity (protected)
- `DELETE /api/v1/cart` - Clear cart (protected)

### Orders

- `POST /api/v1/orders/:cartId` - Create cash order (protected/user)
- `GET /api/v1/orders` - Get user orders (protected)
- `GET /api/v1/orders/:id` - Get order details (protected)
- `GET /api/v1/orders/checkout-session/:cartId` - Get Stripe checkout session (protected/user)
- `PUT /api/v1/orders/:id/pay` - Mark order as paid (protected/admin-manager)
- `PUT /api/v1/orders/:id/deliver` - Mark order as delivered (protected/admin-manager)

### Reviews

- `GET /api/v1/reviews` - Get all reviews
- `POST /api/v1/reviews` - Create review (protected)
- `PUT /api/v1/reviews/:id` - Update review (protected)
- `DELETE /api/v1/reviews/:id` - Delete review (protected)

### Wishlist

- `GET /api/v1/wishlist` - Get user wishlist (protected)
- `POST /api/v1/wishlist` - Add product to wishlist (protected)
- `DELETE /api/v1/wishlist/:productId` - Remove product from wishlist (protected)

### Coupons

- `GET /api/v1/coupons` - Get all coupons (admin)
- `POST /api/v1/coupons` - Create coupon (admin)
- `PUT /api/v1/coupons/:id` - Update coupon (admin)
- `DELETE /api/v1/coupons/:id` - Delete coupon (admin)

### Users

- `GET /api/v1/users` - Get all users (admin)
- `GET /api/v1/users/:id` - Get user details
- `PUT /api/v1/users/:id` - Update user profile
- `DELETE /api/v1/users/:id` - Delete user account

### Payment Webhooks

- `POST /webhook-checkout` - Stripe webhook for payment completion

## Middleware

- **CORS**: Enabled for all routes
- **Compression**: Enabled for response compression
- **Rate Limiting**: 100 requests per 15 minutes
- **HPP Protection**: Prevents HTTP parameter pollution (whitelist: page, limit, sort, fields, keyword)
- **Security Headers**: Applied via configuration
- **Request Logging**: Morgan in development mode
- **Error Handling**: Global error handler with custom ApiError

## Project Structure

```
├── config/
│   └── database.js              # MongoDB connection
├── middleware/
│   ├── errorMiddleware.js       # Global error handler
│   ├── uploadImageMiddleware.js # Image upload handling
│   └── validatorMiddleware.js   # Validation error handler
├── models/                       # Mongoose schemas
├── routes/                       # API routes
├── services/                     # Business logic
│   ├── handlersFactory.js       # Reusable CRUD handlers
│   ├── orderService.js          # Order & Stripe handling
│   └── [other services]
├── utils/
│   ├── ApiError.js              # Custom error class
│   ├── apiFeatures.js           # Query filtering, sorting, pagination
│   ├── createToken.js           # JWT token generation
│   ├── sendEmail.js             # Email service
│   └── validators/              # Input validation rules
├── uploads/                      # Uploaded files
├── server.js                    # Express app setup
├── config.env                   # Environment variables
└── package.json
```

## Security Considerations

- JWT tokens expire after the configured duration (default: 90 days)
- Passwords are hashed using bcryptjs
- Rate limiting prevents brute force attacks
- CORS restricts cross-origin requests
- HPP middleware prevents parameter pollution attacks
- Stripe webhook signatures are verified for payment security
- Environment variables protect sensitive data

## Error Handling

The API uses a centralized error handling middleware that catches and formats all errors as:

```json
{
  "status": "error",
  "message": "Error message here",
  "statusCode": 400
}
```

## Performance

- Response compression reduces payload size
- Pagination limits query results (default: 5 items per page)
- Indexes on frequently queried fields in MongoDB
- Image optimization via Sharp

## Development

### Running in development mode

```bash
npm run start:dev
```

This uses Nodemon to auto-restart the server on file changes.

### Running in production mode

```bash
npm run start:prod
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

ISC

## Author

Youssef Hagag

## Support

For issues and questions, please open an issue on the GitHub repository.

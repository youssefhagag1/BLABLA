const path = require("node:path");
const express = require("express");
const { rateLimit } = require('express-rate-limit')
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const qs = require("qs");
dotenv.config({path : "config.env"})
const databaseConnecton = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const brandRoute = require("./routes/brandRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const productRoute = require("./routes/productRoute")
const reviewRoute = require("./routes/reviewRoute")
const userRoute = require("./routes/userRoute")
const authRoute = require("./routes/authRoute")
const couponRoute = require("./routes/couponRoute")
const cartRoute = require("./routes/cartRoute")
const wishlistRoute = require("./routes/wishlistRoute")
const orderRoute = require("./routes/orderRoute")
const { webhookCheckout } = require("./services/orderService");
const ApiError = require("./utils/ApiError");
const globalError = require("./middleware/errorMiddleware")
databaseConnecton();

const app = express();

app.use(cors());
app.options("/{*any}", cors());
app.use(compression());


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
    message : "Too much requests" 
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)


// Stripe webhook requires the raw body for signature verification.
app.post(
    '/webhook-checkout',
    express.raw({ type: 'application/json' }),
    webhookCheckout
);

app.use(express.json({limit : "20kb"}))
app.set("query parser", str => qs.parse(str));
app.use(express.static(path.join(__dirname , "uploads")))

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
}
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/subCategories", subCategoryRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/coupons", couponRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/wishlist", wishlistRoute);
app.use("/api/v1/orders", orderRoute);


app.all("/{*any}" , (req , res , next) => {
    const error = new ApiError(`Can't find this route : ${req.originalUrl}` , 404);
    next(error);
})

app.use(globalError)


const PORT = process.env.PORT || 8000;

const server = app.listen(PORT , () => {
    console.log(`App running on port ${PORT}`)
})

//hendle error outside express

process.on("unhandledRejection" , (err) => {
    console.error("unhandledRejection Error" , err.name , err.message)
    server.close(() => {
        console.error("shutuing down.....")
        process.exit(1);
    })
})
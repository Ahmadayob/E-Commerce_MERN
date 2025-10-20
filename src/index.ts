import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes";
import productRoute from "./routes/productRoutes";
import { seedInitialProducts } from "./services/productServices";

// Catch uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

try {
    const app = express();
    const port = 3001;

    // Middleware
    app.use(express.json());

    // Connect to MongoDB
    mongoose.connect("mongodb://localhost:27017/ecommerce")
    .then(() => console.log("Mongo connected!"))
    .catch((err) => {
        console.log("Failed to connect to MongoDB:", err.message);
        console.log("Make sure MongoDB is running on localhost:27017");
        // Don't exit, let the app run without DB for now
    })

    app.use('/user', userRoute)
    app.use('/api/products', productRoute)

    // Global error handler
    app.use((err: any, req: any, res: any, next: any) => {
        console.error('Global error:', err);
        res.status(500).json({ error: 'Something went wrong!' });
    });

    // Seed initial products after database connection
    seedInitialProducts().catch(console.error);

    app.listen(port,()=>{
        console.log(`server is running at:http://localhost:${port}`)
    })
} catch (error) {
    console.error('Startup error:', error);
    process.exit(1);
}
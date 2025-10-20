import express from "express";
import { getAllProducts } from "../services/productServices";

const router = express.Router();

// GET /api/products - Get all products
router.get("/", async (req, res) => {
    try {
        const products = await getAllProducts();
        res.json({
            success: true,
            data: products,
            count: products.length
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

export default router;

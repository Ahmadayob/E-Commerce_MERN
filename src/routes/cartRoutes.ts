import express from "express";
import { addItemToCart, GetActiveCartForUser, updateItemInCart } from "../services/cartServices";
import validateJWT from "../middlewares/validateJWT";

interface ExtendRequest extends express.Request {
    user?: any;
}

const router = express.Router();

router.get('/', validateJWT,
     async (req:ExtendRequest, res) => {
    const userId = req?.user?._id;
    const cart = await GetActiveCartForUser({ userId })
    res.status(200).send(cart);

});

router.post('/items',validateJWT,async (req:ExtendRequest,res)=>{
    try {
        const userId = req?.user?._id;
        const {productId,quantity}=req.body;
        const response = await addItemToCart({userId,productId,quantity})
        
        if (response) {
            res.status(response.statusCode).send(response.data);
        } else {
            res.status(500).send("Internal server error");
        }
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).send("Internal server error");
    }
})

router.put('/items',validateJWT,async (req:ExtendRequest,res)=>{
    try {
        const userId = req?.user?._id;
        const {productId,quantity}=req.body;
        const response = await updateItemInCart({userId,productId,quantity})
        
        if (response) {
            res.status(response.statusCode).send(response.data);
        } else {
            res.status(500).send("Internal server error");
        }
    } catch (error) {
        console.error("Error updating item in cart:", error);
        res.status(500).send("Internal server error");
    }
})


export default router;

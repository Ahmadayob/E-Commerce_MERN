import express from "express";
import { GetActiveCartForUser } from "../services/cartServices";
import validateJWT from "../middlewares/validateJWT";

interface ExtendRequest extends express.Request {
    user?: any;
}

const router = express.Router();

router.get('/', validateJWT, async (req: ExtendRequest, res) => {
    const userId = req.user._id;
    const cart = await GetActiveCartForUser({ userId })
    res.status(200).send(cart);

});


export default router;

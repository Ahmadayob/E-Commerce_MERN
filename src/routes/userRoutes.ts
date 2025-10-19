import express from "express";
import { register } from "../services/userServices";


const router = express.Router();

router.post('/register', async (request, response)=>{
    try {
        const {firstName, lastName, email, password} = request.body;
        // Handle both 'firstName' and 'fullname' for compatibility
        const userFirstName = firstName || request.body.fullname;
        const {statusCode,data} = await register({firstName: userFirstName, lastName, email, password});
        response.status(statusCode).send(data);
    } catch (error) {
        console.error('Register error:', error);
        response.status(500).send({ error: 'Internal server error' });
    }
});

export default router;

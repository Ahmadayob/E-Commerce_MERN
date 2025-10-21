import express from "express";
import { register, login } from "../services/userServices";


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

router.post('/login', async (request, response)=>{
    try {
        const {email, password} = request.body;
        const result = await login({email, password});
        
        if (result.error) {
            response.status(400).send(result.error);
        } else {
            response.status(result.statusCode).send(result.data);
        }
    } catch (error) {
        console.error('Login error:', error);
        response.status(500).send({ error: 'Internal server error' });
    }
});

export default router;

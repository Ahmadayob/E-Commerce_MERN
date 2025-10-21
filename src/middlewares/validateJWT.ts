import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";
import { ExtendRequest } from "../types/extendedRequest";



const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.get('authorization');

    if (!authorizationHeader) {
        res.status(403).send("Authorization header was not provided");
        return; // Prevent further execution
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
        res.status(403).send("Bearar token not found");
        return;
    }

    Jwt.verify(token, '1RsfKoQVROtVCYOzILY6TrucIt9aQR3y',async (err, payload) => {
        
        if (err) {
            console.error("JWT verification error:", err.message);
            res.status(403).send("Invalid token");
            return;
        }

        if (!payload) {
            console.error("No payload in token");
            res.status(403).send("Invalid token payload");
            return;
        }
        
        console.log("Token payload:", payload);
        const userPayload = payload as { email: string; firstName: string, lastName: string };

        const user = await userModel.findOne({ email: userPayload.email });
        if (!user) {
            console.error("User not found for email:", userPayload.email);
            res.status(403).send("User not found");
            return;
        }
        
        req.user = user;
        next();
        
    })
}

export default validateJWT;

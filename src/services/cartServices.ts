import { create } from "domain";
import { carModel } from "../models/cartModles";


interface CreateCartForUser{
    userId: string;

}

const CreateCartForUser = async ({userId, }:CreateCartForUser)=>{
    const cart = await carModel.create({userId,totalAmount:0});
    await cart.save();
    return cart;
};

interface GetActiveCartForUser{
    userId:string;
}

export const  GetActiveCartForUser = async({
    userId,
}:GetActiveCartForUser)=>{
    let cart = await carModel.findOne({userId,status:"active"});
    if(!cart){
        cart = await CreateCartForUser({userId});
    }
    return cart;
};

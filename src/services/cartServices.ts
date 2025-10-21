import { create } from "domain";
import { carModel } from "../models/cartModles";
import ProductModel from "../models/productModel";
import { getActiveResourcesInfo } from "process";
import { existsSync } from "fs";


interface CreateCartForUser {
    userId: string;

}

const CreateCartForUser = async ({ userId, }: CreateCartForUser) => {
    const cart = await carModel.create({ userId, totalAmount: 0 });
    await cart.save();
    return cart;
};

interface GetActiveCartForUser {
    userId: string;
}

export const GetActiveCartForUser = async ({
    userId,
}: GetActiveCartForUser) => {
    let cart = await carModel.findOne({ userId, status: "active" });
    if (!cart) {
        cart = await CreateCartForUser({ userId });
    }
    return cart;
};

interface addItemToCart {

    productId: any;
    quantity: number;
    userId: string;
}
export const addItemToCart = async ({ productId, quantity, userId }: addItemToCart) => {
    const cart = await GetActiveCartForUser({ userId });

    const existsInCart = cart.items.find(
        (p: any) => (p.product?.toString?.() === productId)
    );
    if (existsInCart) {
        return { data: "Item already exists in cart!", statusCode: 400 };
    }
    const product = await ProductModel.findById(productId);

    if (!product) {
        return { data: "product not found!", statusCode: 400 };
    }

    if(product.stock<quantity){
        return {data:"Low stock for item",statusCode:400}; 
    }

    cart.items.push({
        product: product._id, // ensure ObjectId type
        unitPrice: product.price,
        quantity
    } as any);

    cart.totalAmount+=product.price*quantity;

    const updatedCart = await cart.save();

    return {data:updatedCart,statusCode:200};

}
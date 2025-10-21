import mongoose,{Schema,ObjectId,Document} from "mongoose";
import { IProduct } from "./productModel";

export interface ICartItem extends Document {
    product: IProduct["_id"];
    quantity: number;
    unitPrice: number;
}

export interface ICart extends Document {
    userId:object| string;
    items: ICartItem[];
    totalAmount: number;
    status: "active" | "completed";
}

const carItemSchema = new Schema<ICartItem>({
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, default: 1 },
   unitPrice: { type: Number, required: true },
});

const carSchema = new Schema<ICart>({
    userId:{type:Schema.Types.ObjectId,ref:"User",required:true},
    items: [carItemSchema],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["active", "completed"], default: "active" }
});

export const carModel = mongoose.model<ICart>("Cart", carSchema);
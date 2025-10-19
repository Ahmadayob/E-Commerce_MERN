import { userModel } from "../models/userModel";
import bcrypt from "bcryptjs";
import JWT from 'jsonwebtoken'

interface RegisterParams{
firstName: string;
lastName: string;
email: string;
password: string;
}

export const register = async ({firstName, lastName, email, password}: RegisterParams)=>{
    const findUser = await userModel.findOne({email })

    if(findUser){

        return{data:"User already exists!",statusCode:400}
    }


const hashedPassword = await bcrypt.hash(password, 10)
const newUser = new userModel({firstName,lastName,email,password: hashedPassword})
await newUser.save();

return {data: generateJWT({firstName,lastName,email}),statusCode:200}

// Remove password from response for security
const userResponse = {
    _id: newUser._id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    __v: newUser.__v 
};

return {data : userResponse, statusCode: 200};
}
interface LoginParams{
    email: string;
    password: string;

}

export const login =async ({email,password}: LoginParams)=>{

    const findUser = await userModel.findOne({email})

    if(!findUser){
        return {error:{message:"Incorect email or password!"}}
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if(passwordMatch){
        // Remove password from response for security
        const userResponse = {
            _id: findUser._id,
            firstName: findUser.firstName,
            lastName: findUser.lastName,
            email: findUser.email,
            __v: findUser.__v
        };
        return {data:generateJWT ({email,firstName: findUser.firstName,lastName:findUser.lastName}),statusCode:200};
    }

    return {error:{message:"Incorect email or password!"}} 
};

const generateJWT = (data: any) =>{
    return JWT.sign(data,'1RsfKoQVROtVCYOzILY6TrucIt9aQR3y')
}
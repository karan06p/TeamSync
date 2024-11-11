import { ApiError } from "@/helpers/ApiError";
import { ApiResponse } from "@/helpers/ApiResponse";
import { hashPassword } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { sendVerificationEmail } from "@/lib/SendVerificationEmail";
import UserModel from "@/models/User.model";


// TODO: Optimize the logic
export async function POST(request: Request){
    await dbConnect()

    try {
        const { firstName, lastName, username, email, password} = await request.json();
    
        // check if user exists by username or email
        const usernameExists = await UserModel.findOne({username})
        const emailExists = await UserModel.findOne({email})
        if(usernameExists && usernameExists.isVerified){
            return ApiError("Username already taken", 409)
        }
        if(emailExists){
            return ApiError("Email already exists, please login", 409)
        }
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const codeExpiry = new Date()
        codeExpiry.setHours(codeExpiry.getHours() + 1) // this sets expiration time equal to 1 hour
    
        try {
            if(!usernameExists && !emailExists){
                //if user not exists already
                const hashedPassword = await hashPassword(password); 
                const newUser = new UserModel({
                    firstName,
                    lastName,
                    username,
                    email,
                    password: hashedPassword,
                    verificationCode: otp,
                    expiresIn: codeExpiry
                })
                await newUser.save()
            }
            await sendVerificationEmail(email, username, otp)
            return ApiResponse("User Registered", 200)
        } catch (error) {
            console.log(error)
            return ApiError("Some Error Occurred" ,400)
        }
    } catch (error) {
        console.error("Error Registering User", error)
        return ApiError("Error registering user", 500)
    }
}
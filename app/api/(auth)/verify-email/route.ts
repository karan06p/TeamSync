import { ApiError } from "@/helpers/ApiError";
import { ApiResponse } from "@/helpers/ApiResponse";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export async function POST(request: Request){
    await dbConnect()
    try {
        const {username, verificationCode} = await request.json()
        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({username: decodedUsername})
        if(!user){
            return ApiError("User not found", 404)
        }
        const isCodeValid = user.verificationCode === verificationCode;
        const isCodeNotExpired = new Date(user.expiresIn) > new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true;
            await user.save()
            return ApiResponse("User verified successfully", 200)
        }else if(!isCodeNotExpired){
            return ApiError("Verification Code has expired, please signup again to get a new code", 400)
        }else{
            return ApiError("Incorrect Verification Code", 400)
        }
    } catch (error) {
        console.error("Error verifying code", error)
        return ApiError("Error verifying code", 500)
    }
}
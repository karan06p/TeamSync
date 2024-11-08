import { ApiError } from "@/helpers/ApiError";
import { ApiResponse } from "@/helpers/ApiResponse";
import { verifyPassword } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { signingMethod = "username", username = "", email = "", password } = await request.json();

    // Check if the required parameters are provided based on the signingMethod
    if (signingMethod === "username" && !username) {
      return ApiError("Please enter a username", 401);
    }
    if (signingMethod === "email" && !email) {
      return ApiError("Please enter an email", 401);
    }
    if (!password) {
      return ApiError("Please enter password", 401);
    }
    
    try {
      let result;
    
      if (signingMethod === "username") {
        result = await UserModel.findOne({ username });
      } else if (signingMethod === "email") {
        result = await UserModel.findOne({ email });
      }
    
      // Check if user exists
      if (!result) {
        return ApiError("User not found", 404);
      }
    
      // Verify password
      const isPasswordCorrect = await verifyPassword(password, result.password);
      if (!isPasswordCorrect) {
        return ApiError("Incorrect password", 401);
      }
    
      return ApiResponse("User authenticated successfully", 200);
    } catch (error) {
      console.error("Error during 1", error);
      return ApiError("Authentication error", 500);
    }
    
   
      
  } catch (error) {
    console.error("Error during authentication:", error);
  return ApiError("Error while authentication", 500);
  }
}

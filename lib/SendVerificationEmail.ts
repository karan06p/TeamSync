import VerificationEmail from "@/components/email-template";
import { ApiResponse } from "@/types/ApiResponse";
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(
    email: string,
    username: string,
    verificationCode: string,
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: "Team Sync <onboarding@resend.dev>",
            to: email,
            subject: "Verify Email",
            react: VerificationEmail({username, otp: verificationCode})
        })
        return {success: true, message: "Verification Email send successfully."}
    } catch (emailError) {
        console.error("Error sending Verification Email")
        return {success: false, message: "Failed to send Verification Email"}
    }
}
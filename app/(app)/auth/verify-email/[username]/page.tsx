"use client";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";



// TODO: Optimise
const VerifyEmailPage = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [code, setCode] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const router = useRouter()
  const {username} = useParams()

  const onSubmit = async () => {
    if(!username || !code){
      setErrorMessage("Username or verification code is missing")
    }
    setIsSubmitting(true)
    try {
      const response = await axios.post("/api/verify-email", {
        username,
        verificationCode: code
      })
      if(response.status === 200){
        router.replace("/dashboard")
      }
    } catch (error) {
      console.error("Error submitting code")
    }finally{
      setIsSubmitting(false)
    }
  }

  return (
    <div className=" bg-white  rounded-lg">
      <div className="p-5 flex flex-col items-center gap-5">
        <p className="text-lg">Enter your verification code</p>
      <div >
        <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} onChange={(value) => setCode(value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button onClick={onSubmit}>{isSubmitting ? <LoaderCircle className="animate-spin"/> : "Submit"}</Button>
      </div>

    </div>
  );
};

export default VerifyEmailPage;

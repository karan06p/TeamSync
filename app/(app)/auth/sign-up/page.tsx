"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string().min(2, {
    message: "Username must be at least of 2 characters"
  }),
  email: z.string().email(),
  password: z.string().regex(/^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message: "Password must be atleast of 8 characters and it should contain a number and a special character"
  })
})

// TODO: Add Toast for errors and use loading state
const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastValue, setToastValue] = useState<string>("")

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    }
  })
  async function onSubmit(values: z.infer<typeof formSchema>){
    if(!values.firstName || !values.lastName || !values.username || !values.email || !values.password){
      setToastValue("All Values are required")
    }else{
      setIsLoading(true)
      try {
        const result = await axios.post("http://localhost:3000/api/sign-up", {
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          email: values.email,
          password: values.password
        })
        if(result.status === 200){
          router.replace(`/auth/verify-email/${values.username}`)
        }else{
          console.log("User not found", result.status)
        }
      } catch (error) {
        console.log("Error signing up", error)
      }finally{
        setIsLoading(false)
      }
    }
  }
  return (
    <div className="max-w-lg">
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-5 rounded-lg">
      <div className="flex gap-5">
        <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </div>
      <div className="flex gap-5">
        <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </div>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <Button  type="submit">Submit</Button>
    </form>
  </Form>
  </div>
  )
}

export default SignUpPage;


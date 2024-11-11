"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoaderCircle, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Eye } from 'lucide-react';
import { EyeClosed } from 'lucide-react';
import { Mail } from 'lucide-react';


const usernameFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});
const emailFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const usernameForm = useForm<z.infer<typeof usernameFormSchema>>({
    resolver: zodResolver(usernameFormSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });
  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onUsernameFormSubmission(
    values: z.infer<typeof usernameFormSchema>
  ) {
    setIsLoading(true);
    setUsernameErrorMessage("")
    try {
      const result = await axios.post("http://localhost:3000/api/sign-in", {
        username: values.username,
        password: values.password,
      })
      if(result.status === 200){
        router.replace("/dashboard")
      }else if(result.status === 404){
        setUsernameErrorMessage("Username not found")
      }else{
        setUsernameErrorMessage("Cannot find username")
      }
    } catch (error) {
      console.error("Error signing in", error)
    }finally{
      setIsLoading(false)
    }
  }
  async function onEmailFormSubmission(
    values: z.infer<typeof emailFormSchema>
  ) {
    setIsLoading(true);
    setEmailErrorMessage("")
    try {
      const result = await axios.post("http://localhost:3000/api/sign-in", {
        username: values.email,
        password: values.password,
      })
      if(result.status === 200){
        router.replace("/dashboard")
      }else if(result.status === 404){
        setUsernameErrorMessage("Username not found")
      }else{
        setUsernameErrorMessage("Cannot find username")
      }
    } catch (error) {
      console.error("Error signing in", error)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <Tabs defaultValue="username" className="w-[400px] hidden sm:block">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="username">Username</TabsTrigger>
        <TabsTrigger value="email">Email</TabsTrigger>
      </TabsList>
      <TabsContent value="username">
        <Form {...usernameForm}>
          <form onSubmit={usernameForm.handleSubmit(onUsernameFormSubmission)}>
            <Card>
              <CardHeader>
                <CardTitle>Login with Username</CardTitle>
                <CardDescription>
                  Login to your account using username.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <FormField
                    control={usernameForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div>
                            <Input placeholder="username" {...field} suffix={<User />}/>
                            <p className="text-sm text-destructive ml-2">
                              {usernameErrorMessage}
                            </p>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <FormField
                    control={usernameForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div>
                            <Input type={showPassword ? "text" : "password"} placeholder="password" {...field} suffix={showPassword ? <Eye className="cursor-pointer" onClick={() => setShowPassword(false)} /> : <EyeClosed className="cursor-pointer" onClick={() => setShowPassword(true)}/> }/>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">
                  {isLoading ? (
                    <div className="flex">
                      Signing In
                      <LoaderCircle className="animate-spin" />
                    </div>
                  ) : (
                    "Sign In "
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="email">
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(onEmailFormSubmission)}>
        <Card>
          <CardHeader>
            <CardTitle>Login with Email</CardTitle>
            <CardDescription>
              Login to your account using your email.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div>
                            <Input placeholder="email" {...field} suffix={<Mail />}/>
                            <p className="text-sm text-destructive ml-2">
                              {emailErrorMessage}
                            </p>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <FormField
                    control={usernameForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div>
                            <Input type={showPassword ? "text" : "password"} placeholder="password" {...field} suffix={showPassword ? <Eye className="cursor-pointer" onClick={() => setShowPassword(false)} /> : <EyeClosed className="cursor-pointer" onClick={() => setShowPassword(true)}/> }/>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
          <CardFooter>
            <Button type="submit">
              Sign In{" "}
              {isLoading ? <LoaderCircle className="animate-spin" /> : ""}
            </Button>
          </CardFooter>
        </Card>
        </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
};

export default SignInPage;

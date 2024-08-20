"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@saasfly/ui";
import { buttonVariants } from "@saasfly/ui/button";
import * as Icons from "@saasfly/ui/icons";
import { Input } from "@saasfly/ui/input";
import { Label } from "@saasfly/ui/label";
import { toast } from "@saasfly/ui/use-toast";

import "../web3/useWeb3";

import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { Controller } from "react-hook-form";

type Dictionary = Record<string, string>;

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
  dict: Dictionary;
}

const userAuthSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
  address: z.string().nonempty("Please connect your crypto wallet"),
  userType: z.enum(["customer", "community", "company"], {
    errorMap: () => ({ message: "User type is required" }),
  }),
});

type FormData = z.infer<typeof userAuthSchema>;

export function UserLoginForm({
  className,
  lang,
  dict,
  ...props
}: UserLoginFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [accountAddress, setAccountAddress] = React.useState<string>();
  const searchParams = useSearchParams();

  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  async function handleWalletConnect() {
    try {
      await open();
      if (isConnected) {
        setAccountAddress(address);
      }
      console.log(address);
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  }

  async function handleSignIn(data: FormData) {
    console.log("data", data);
    setIsLoading(true);

    const signInResult = await signIn("credentials", {
      username: data.username,
      password: data.password,
      address: data.address,
      userType: data.userType,
      redirect: true,
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${lang}/dashboard`,
    }).catch((error) => {
      console.error("Error during sign in:", error);
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      console.error("Sign-in failed with status:", signInResult?.status);
      console.error("Sign-in error message:", signInResult?.error);

      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    return toast({
      title: "Sign in successful.",
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Email
            </Label>
            <Input
              id="username"
              placeholder="Username"
              type="username"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("username")}
            />
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />

            {accountAddress ? (
              <>
                <button
                  type="button"
                  className={cn(buttonVariants())}
                  onClick={handleWalletConnect}
                  disabled={isLoading}
                >
                  Crypto Wallet Connected
                </button>
                <p className="mt-2 text-sm text-green-600">
                  Connected Wallet Address: {accountAddress}
                </p>
                <Input
                  id="address"
                  type="hidden"
                  value={accountAddress}
                  {...register("address")}
                />
              </>
            ) : (
              <button
                type="button"
                className={cn(buttonVariants())}
                onClick={handleWalletConnect}
                disabled={isLoading}
              >
                Connect Crypto Wallet
              </button>
            )}

            <Controller
              name="userType"
              control={control}
              defaultValue="customer"
              render={({ field }) => (
                <RadioGroup label="Select your user type" {...field}>
                  <Radio value="customer">Client</Radio>
                  <Radio value="community">Community</Radio>
                  <Radio value="company">Company</Radio>
                </RadioGroup>
              )}
            />

            {errors?.username && (
              <p className="px-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}

            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}

            {errors?.address && (
              <p className="px-1 text-xs text-red-600">
                {errors.address.message}
              </p>
            )}

            {errors?.userType && (
              <p className="px-1 text-xs text-red-600">
                {errors.userType.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

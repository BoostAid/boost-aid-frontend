"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarGroup, AvatarIcon, Chip } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@saasfly/ui";
import { buttonVariants } from "@saasfly/ui/button";
import * as Icons from "@saasfly/ui/icons";
import { Input } from "@saasfly/ui/input";
import { Label } from "@saasfly/ui/label";
import { toast } from "@saasfly/ui/use-toast";

import { env } from "~/env.mjs";

import "../web3/useWeb3";

import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";

type Dictionary = Record<string, string>;

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
  dict: Dictionary;
}

const userAuthSchema = z.object({
  username: z.string().nonempty("Username is required"),
  address: z.string().nonempty("Please connect your crypto wallet"),
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().email().nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
  // companies: z.array(z.string()).nonempty("At least one company is required"),
});

type FormData = z.infer<typeof userAuthSchema>;

export function CommunityRegisterForm({
  className,
  lang,
  dict,
  ...props
}: UserRegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [accountAddress, setAccountAddress] = React.useState<string>();
  const searchParams = useSearchParams();
  const [companies, setCompanies] = React.useState<string[]>([]);
  const [currentCompany, setCurrentCompany] = React.useState<string>("");
  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const handleAddCompany = () => {
    if (currentCompany.trim()) {
      setCompanies([...companies, currentCompany]);
      setCurrentCompany("");
    }
  };

  async function handleWalletConnect() {
    try {
      await open();
      // const { walletInfo } = useWalletInfo();
      if (isConnected) {
        setAccountAddress(address);
      }
      console.log(address);
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  }

  async function handleSignUp(data: FormData) {
    console.log(data);

    const formData = {
      ...data,
      companies: companies,
    };

    console.log(formData);

    setIsLoading(true);

    const response = await fetch(
      `${env.NEXT_PUBLIC_API_ROOT}/auth/c-member/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );

    if (!response) {
      console.error("Error during sign up:");
      return;
    }

    const signInResult = await signIn("credentials", {
      username: data.username,
      password: data.password,
      address: data.address,
      userType: "community",
      redirect: false,
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${lang}/dashboard`,
    }).catch((error) => {
      console.error("Error during sign in:", error);
    });

    setIsLoading(false);

    if (signInResult?.error) {
      console.error("Sign-in failed with error:", signInResult.error);
      return toast({
        title: "Something went wrong.",
        description: "Your sign-in request failed. Please try again.",
        variant: "destructive",
      });
    }

    if (signInResult?.url) {
      window.location.href = signInResult.url;
    } else {
      // Handle the case when no URL is provided
      console.error("No redirection URL provided.");
      return toast({
        title: "Something went wrong.",
        description: "Could not redirect after sign-in.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />

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
              id="firstName"
              placeholder="First Name"
              type="firstName"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("firstName")}
            />

            <Input
              id="lastName"
              placeholder="Last Name"
              type="lastName"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("lastName")}
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

            <p className="mt-3">Enter the companies you want to work for:</p>

            <Input
              placeholder="Company Name"
              value={currentCompany}
              onChange={(e) => setCurrentCompany(e.target.value)}
              id="companies"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />

            <button className={cn(buttonVariants())} onClick={handleAddCompany}>
              Add
            </button>

            <div className="flex flex-wrap justify-between gap-4">
              {companies.map((company, index) => (
                <Chip key={index} color="primary" size="md">
                  {company}
                </Chip>
              ))}
            </div>

            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}

            {errors?.username && (
              <p className="px-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}

            {errors?.firstName && (
              <p className="px-1 text-xs text-red-600">
                {errors.firstName.message}
              </p>
            )}

            {errors?.lastName && (
              <p className="px-1 text-xs text-red-600">
                {errors.lastName.message}
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

            {/* {errors?.companies && (
              <p className="px-1 text-xs text-red-600">
                {errors.companies.message}
              </p>
            )} */}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

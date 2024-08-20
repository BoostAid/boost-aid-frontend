import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { KyselyAdapter } from "@auth/kysely-adapter";
import { getServerSession, type NextAuthOptions, type User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

import { MagicLinkEmail, resend, siteConfig } from "@saasfly/common";

import { db } from "./db";
import { env } from "./env.mjs";

type UserId = string;
type IsAdmin = boolean;

declare module "next-auth" {
  interface User {
    accountType?: string; 
  }
  interface Session {
    user: User & {
      id: UserId;
      isAdmin: IsAdmin;
    };
  }
}

declare module "next-auth" {
  interface JWT {
    isAdmin: IsAdmin;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  adapter: KyselyAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        address: { label: "Address", type: "text" },
        userType: { label: "userType", type: "text" },
      },
      async authorize(credentials) {    
        try {

          var response;

          if(credentials?.userType === 'customer'){

            console.log();
            response = await fetch(`${env.NEXT_PUBLIC_API_ROOT}/auth/customer/signin`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: credentials?.username,
                password: credentials?.password,
                address: credentials?.address,
              }),
            });
          } 
          else if(credentials?.userType === 'community'){
            response = await fetch(`${env.NEXT_PUBLIC_API_ROOT}/auth/c-member/signin`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: credentials?.username,
                password: credentials?.password,
                address: credentials?.address,
              }),
            });
          }
          else if(credentials?.userType === 'company'){
            response = await fetch(`${env.NEXT_PUBLIC_API_ROOT}/auth/company/signin`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.username,
                password: credentials?.password,
                address: credentials?.address,
              }),
            });

          }
          else {
            console.error('User type not provided');
          }
    
    
          if (!response?.ok) {
            console.error("Failed to sign in:", response?.statusText);
            return null;
          }
    
          const user = await response.json();

          return {
            name: credentials?.username, 
            token: user.token, 
            accountType: credentials?.userType,
            // ...(credentials?.userType === 'customer' && { customerData: user.customerData }),
            // ...(credentials?.userType === 'community' && { communityData: user.communityData }),
            // ...(credentials?.userType === 'company' && { companyData: user.companyData }),
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),

  ],
  callbacks: {
    session({ token, session }) {
      if (token) {
        if (session.user) {
          // session.user.id = token.id as string;
          session.user.name = token.name;
          // session.user.email = token.email;
          // session.user.image = token.picture;
          // session.user.isAdmin = token.isAdmin as boolean;
          session.user.accountType = token.accountType || 'Account type missing.'; 
          session.user.userId = token.userId;
          session.user.accessToken = token.accessToken;

          // if (token.accountType === 'customer') {
          //   session.user.customerData = token.customerData;
          // } else if (token.accountType === 'community') {
          //   session.user.communityData = token.communityData;
          // } else if (token.accountType === 'company') {
          //   session.user.companyData = token.companyData;
          // }
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token; 
        // token.id = '0'; 
        token.name = user.name; 
        // token.email = 'test@gmail.com'; 
        // token.sub = user.id; 
        // token.isAdmin = false;
        token.accountType = user.accountType || 'Account type missing.';

        const decodedToken = JSON.parse(atob(user.token.split('.')[1]));
        token.userId = decodedToken.id;

        // if (user.accountType === 'customer') {
        //   token.customerData = user.customerData;
        // } else if (user.accountType === 'community') {
        //   token.communityData = user.communityData;
        // } else if (user.accountType === 'company') {
        //   token.companyData = user.companyData;
        // }
      }
      console.log('session token', token);
      return token; 
    },
  },
  debug: env.IS_DEBUG === "true",
};

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

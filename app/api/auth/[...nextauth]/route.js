import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { socialSignupApiCall } from "@/_helpers/social-signup.helper";
import { credentialSignupApiCall } from "@/_helpers/credential-signup";
import { credentialLoginApiCall } from "@/_helpers/credential-login";

export const authOptions = {
  secret: process.env.NEXT_SOCIAL_LOGIN_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.NEXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_GITHUB_CLIENT_SECRET,
    }),
    CredentialProvider({
      credentials: {
        firstName: { label: "First Name", type: "text" },
        lastName: { label: "Last Name", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        isSignup: { label: "Signup", type: "boolean" },
      },
      async authorize(credentials) {
        const { firstName, lastName, email, password, isSignup } = credentials;
        let responseObject = {};
        if (isSignup === "true") {
          let response = await credentialSignupApiCall({
            firstName,
            lastName,
            email,
            password,
            accountType: "credentials"
          });
          // responseObject.status = response?.status;
          responseObject.id = response?.user?._id || response?.user?.id;
          responseObject.firstName = response?.user?.firstName;
          responseObject.lastName = response?.user?.lastName;
          responseObject.email = response?.user?.email;
          if (response?.dp) {
            responseObject.dp = response?.dp;
          }
          if (response?.username) {
            responseObject.username = response?.username;
          }
          if (!response?.status) {
            throw new Error("User Already Exist! Please Login");
          } else {
            responseObject.message = response?.message;
          }
        } else {
          let response = await credentialLoginApiCall({ email, password, accountType: "credentials" });
          console.log(response);
          
          // responseObject.status = response?.status;
          responseObject.id = response?.user?._id || response?.user?.id;
          responseObject.firstName = response?.user?.firstName;
          responseObject.lastName = response?.user?.lastName;
          responseObject.email = response?.user?.email;
          if (response?.dp) {
            responseObject.dp = response?.dp;
          }
          if (response?.username) {
            responseObject.username = response?.username;
          }
          if (!response?.status) {
            // throw new Error("User Not Found! Please Signup");
            throw new Error(response?.message);
          } else {
            responseObject.message = response?.message;
          }
        }

        console.log(responseObject, "responseObject");

        return responseObject;
      },
    }),
  ],
  pages: {
    error: "/auth/callback", // ✅ send errors here
  },
  callbacks: {
    async signIn({ user, account, credentials, email, profile }) {
      if (account?.provider === "credentials") {
        return true;
      }
      const cookieStore = await cookies();
      const state = cookieStore.get("oauth_state")?.value || null;
      if (account?.provider === "google") {
        if (state === "signup") {
          const apiCallBody = {
            firstName: profile?.given_name,
            lastName: profile?.family_name,
            email: profile?.email,
            dp: profile?.picture,
            googleId: profile?.sub,
            accountType: "google",
          };
          let response = await socialSignupApiCall(apiCallBody);

          if (response?.status) {
            user.id = response.user.id || response.user._id;
            user.email = response.user.email;
            user.dp = response.user.dp;
            user.firstName = response.user.firstName;
            user.lastName = response.user.lastName;
            user.googleId = response.user.googleId;
            if (response.user?.username) {
              user.username = response.user?.username;
            }
            return true;
          }
          if (
            !response?.status &&
            response?.message === "User Already Exist! Please Login"
          ) {
            throw new Error("User Already Exist! Please Login");
          }
          user.error = "Something went wrong";
          throw new Error("Something went wrong");
        }
        if (state === "login") {
          let token = jwt.sign(
            { email: profile.email, accountType: "google" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          let rawResponse = await fetch(
            `${process.env?.NEXT_FRONTEND_URL}/api/auth/social-login/`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              },
            }
          );
          let response = await rawResponse.json();
          if (response.status) {
            console.log("good good");

            user.id = response.user.id || response.user._id;
            user.email = response.user.email;
            user.dp = response.user.dp;
            user.firstName = response.user.firstName;
            user.lastName = response.user.lastName;
            user.googleId = response.user?.googleId;
            if (response.user?.username) {
              user.username = response.user?.username;
            }
            return true;
          }
          if (
            !response?.status &&
            response?.message === "User Not Found! Please Signup"
          ) {
            throw new Error("User Not Found! Please Signup");
          }
          throw new Error("Something went wrong");
        }
      }
      if (account?.provider === "github") {
        if (state === "signup") {
          console.log("we are in signup in github");
          let splitName = profile?.name?.split(" ");
          let last_name = "";
          if (splitName?.length > 1) {
            last_name = splitName.pop();
          }
          let first_name = splitName.join(" ");
          const apiCallBody = {
            firstName: first_name,
            lastName: last_name,
            email: profile?.email,
            dp: profile?.avatar_url,
            accountType: "github",
          };
          let response = await socialSignupApiCall(apiCallBody);

          if (response?.status) {
            user.id = response.user.id || response.user._id;
            user.email = response.user.email;
            user.dp = response.user.dp;
            user.firstName = response.user.firstName;
            user.lastName = response.user.lastName;
            if (response.user?.username) {
              user.username = response.user?.username;
            }
            return true;
          }
          if (
            !response?.status &&
            response?.message === "User Already Exist! Please Login"
          ) {
            throw new Error("User Already Exist! Please Login");
          }
          throw new Error("Something went wrong");
        }
        if (state === "login") {
          let token = jwt.sign(
            { email: profile.email, accountType: "github" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          let rawResponse = await fetch(
            `${process.env?.NEXT_FRONTEND_URL}/api/auth/social-login/`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              },
            }
          );
          let response = await rawResponse.json();
          if (response.status) {
            user.id = response.user.id || response.user._id;
            user.email = response.user.email;
            user.dp = response.user.dp;
            user.firstName = response.user.firstName;
            user.lastName = response.user.lastName;
            user.googleId = response.user?.googleId;
            if (response.user?.username) {
              user.username = response.user?.username;
            }
            return true;
          }
          if (
            !response?.status &&
            response?.message === "User Not Found! Please Signup"
          ) {
            throw new Error("User Not Found! Please Signup");
          }
          throw new Error("Something went wrong");
        }
      }
    },
    async session({ session, token }) {
      console.log(token, "sessionUser");
      session.user.id = token?.id;
      session.user.email = token?.email;
      session.user.dp = token?.dp;
      session.user.firstName = token?.firstName;
      session.user.lastName = token?.lastName;
      if (token?.username) {
        session.user.username = token?.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user?.id || user._id;
        token.email = user?.email;
        if (user.dp) {
          token.dp = user?.dp;
        }
        token.firstName = user?.firstName || user?.name?.split(" ")[0] || "";
        token.lastName =
          user.lastName || user?.name?.split(" ").slice(-1)[0] || "";
        if (user?.username) {
          token.username = user?.username;
        }
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

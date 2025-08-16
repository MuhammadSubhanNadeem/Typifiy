import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { socialSignupApiCall } from "@/_helpers/social-signup.helper";

export const authOptions = [];

const handler = NextAuth({
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
  ],
  callbacks: {
    async signIn({ user, account, credentials, email, profile }) {
      const cookieStore = await cookies();
      const state = cookieStore.get("oauth_state").value;
      if (account?.provider === "google") {
        if (state === "signup") {
          console.log("we are in signup");
          const apiCallBody = {
            firstName: profile?.given_name,
            lastName: profile?.family_name,
            email: profile?.email,
            dp: profile?.picture,
            googleId: profile?.sub,
            accountType: "google",
          };
          let response = await socialSignupApiCall(apiCallBody);
          console.log(response, "response");

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
            response?.message === "User Already Exists! Please Login"
          ) {
            user.error = response.message;
            // return `/login`;
            return true;
          }
          user.error = "Something went wrong";
          // return `/signup`;
          return true;
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
            user.error = response.message;
            // return `/signup`;
            return true;
          }
          user.error = "Something went wrong! Try Again";
          // return `/login`;
          return true;
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
            // return "/";
            return true;
          }
          if (
            !response?.status &&
            response?.message === "User Already Exists! Please Login"
          ) {
            user.error = response?.message;
            // return `/signup`;
            return true;
          }
          user.error = "Something went wrong";
          // return `/signup`;
          return true;
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
            // return "/";
            return true;
          }
          if (
            !response?.status &&
            response?.message === "User Not Found! Please Signup"
          ) {
            user.error = response?.message;
            // return `/signup`;
            return true;
          }
          user.error = "Something went wrong";
          // return `/login`;
          return true;
        }
      }
    },
    async session({ session, token, user }) {
      console.log(user, "sessionUser");
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.dp = token.dp;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      if (token?.username) {
        session.user.username = token?.username;
      }
      if (token?.error) {
        session = {};
        session.error = token?.error;
      }
      return session;
    },
    async jwt({ token, user }) {
      // First time login
      if (user) {
        token.id = user.id || user._id || null; // use id from OAuth or DB
        token.email = user.email;
        token.dp = user.dp || user.image;
        token.firstName = user.firstName || user.name?.split(" ")[0] || "";
        token.lastName =
          user.lastName || user.name?.split(" ").slice(-1)[0] || "";
        if (user?.username) {
          token.username = user.username;
        }
        if (user?.error) {
          token = {};
          token.error = user.error;
        }
      }
      return token;
    },
    // async redirect({ url, baseUrl}) {
    //   return url.startsWith("/")
    //     ? `${process.env?.NEXT_FRONTEND_URL}${url}`
    //     : process.env?.NEXT_FRONTEND_URL;
    // },
  },
});
export { handler as GET, handler as POST };

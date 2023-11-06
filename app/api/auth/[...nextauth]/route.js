import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/app/(models)/User";
import Connection from "@/app/(utils)/db";

Connection();

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          const existingUser = await User.findOne({ email });
          if (!existingUser) {
            return null;
          }
          const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
          );
          if (!isPasswordCorrect) {
            return null;
          }
          return existingUser;
        } catch (error) {
          return new Error("Error", error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "credentials") {
        return true;
      }

      if (account.provider == "google") {
        try {
          // console.log("User", user);
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = await User.create({
              username: user.name,
              email: user.email,
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (error) {
          console.log("Error", error);
          return false;
        }
      }
    },
  },
  session: {
    maxAge: 10,
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/app/(models)/User";

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
};

export const handler = NextAuth(authOptions);
export {handler as GET , handler as POST}
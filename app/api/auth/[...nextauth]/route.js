import { connectToDB } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async section({ session }) {},
  async signIn({ profile }) {
    try {
      await connectToDB();
      return true
    } catch (error) {
      console.error(error);
      return false
    }
  },
});

export { handler as GET, handler as POST };

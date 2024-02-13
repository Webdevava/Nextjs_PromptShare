import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

// console.log(process.env.GOOGLE_ID,process.env.GOOGLE_CLIENT_SECRET)

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      // Store the user id from MongoDB to session if not already set
      if (!session.user.id) {
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
      }

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        if (!profile || !profile.email) {
          throw new Error("Missing profile information");
        }

        // Check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // If not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name ? profile.name.replace(" ", "").toLowerCase() : "", // Handle missing name
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return {
          error: "Sign-in error",
          message: error.message
        };
      }
    },
  }
});

export { handler as GET, handler as POST };

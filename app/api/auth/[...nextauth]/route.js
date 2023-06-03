import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@utils/database";
import User from "@models/user";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email,
            })
            session.user.id = sessionUser._id.toString()
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDatabase();
                // check if a user already exists
                const userExists = await User.findOne({ email: profile.email });
                if (userExists) {
                    return true;
                }
                // if not, create a new user
                await User.create({
                    username: profile.name.replace(" ","").toLowerCase(),
                    email: profile.email,
                    image: profile.picture,
                });
                // await newUser.save();

            } catch (error) {
console.log("error2",error)
            }
        }
    }

    
})

export { handler as GET, handler as POST}
import GoogleProvider from 'next-auth/providers/google';
import connectDb from '@/config/database';
import User from '@/app/models/user';


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                }
            }
        })
    ],
    callbacks: {
        //Invoked on Successfull signin
        async signIn({ profile }: { profile: any }) {
            console.log("Email", profile.email)
            //1.connect to DB
            await connectDb()
            //2. Check if User exists/Find user by email
            const userExists = await User.findOne({ email: profile.email });
            console.log("User Exists", userExists)
            //3. If user exists, return true
            if (!userExists) {
                console.log("User Exists Condition Accepted")
                //Truncate User name if too long
                const userName = profile.name.slice(0, 5);
                console.log("User Name", userName)
                console.log("User Picture", profile.picture)
                try {
                    await User.create({
                        email: profile.email,
                        username: userName, // Ensure this matches the schema
                        image: profile.picture,
                    });
                } catch (error) {
                    console.error('User validation failed:', (error as Error).message);
                    throw new Error('User validation failed');
                }
            }
            //4.Return true to sign in
            return true;

        },
        //Session call back function
        async session({ session }: { session: any }) {
            //1. Check if user exists in DB
            const mUser = await User.findOne({ email: session.user.email });
            //2. Assign User Id from session
            session.user.id = mUser._id.toString();
            console.log("User iD", session.user.id)
            //3. Return session
            return session;
        }
    }
};
import { getServerSession } from "next-auth/next";
import { authOptions } from "./authoptions";

export default async function getSessionUser() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return null;
    }
    return {
        user: session.user,
        userId: session.user.id,
    }
}


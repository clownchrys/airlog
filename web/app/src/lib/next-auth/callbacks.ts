import { Account, Profile, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

const callbacks = {
  async signIn(user: User, account: Account, profile: Profile): Promise<boolean|string> {
    // store specific user data to appDb
    try {
      // console.log("Callback: signIn ", { user, account, profile });
      return true; // Promise.resolve(true);
    } catch (e) {
      // console.log("CallbackError: signIn ", e);
      return Promise.reject(e);
    }
  },
  async session(session: Session, userOrToken: JWT | User): Promise<Session> {
    try {
      // console.log("Callback: session ", { session, userOrToken });
      return session;
    } catch (e) {
      // console.log("CallbackError: session ", e);
      return Promise.reject(e);
    }
  },
  async jwt(token: JWT, user?: User, account?: Account, profile?: Profile, isNewUser?: boolean): Promise<JWT> {
    try {
      // console.log("Callback: jwt ", { token, user, account, profile, isNewUser });
      return token;
    } catch (e) {
      // console.log("CallbackError: jwt ", e);
      return Promise.reject(e);
    }
  },
  async redirect(url: string, baseUrl: string): Promise<string> {
    try {
      // console.log("Callback: redirect ", { url, baseUrl });
      return url.startsWith(baseUrl) ? url: baseUrl;
    } catch (e) {
      // console.log("CallbackError: redirect ", e);
      return Promise.reject(e);
    }
  }
}

export default callbacks;
import { LinkAccountEventMessage, SignInEventMessage, User } from "next-auth";
import { JWT } from "next-auth/jwt";

const events = {
  async signIn(message: SignInEventMessage): Promise<void> {
    // console.log("Event: signIn ", message);
  },
  async signOut(message: JWT): Promise<void> {
    // console.log("Event: signOut ", message);
  },
  async createUser(message: User): Promise<void> {
    // console.log("Event: createUser ", message);
  },
  async updateUser(message: User): Promise<void> {
    // console.log("Event: updateUser ", message);
  },
  async linkAccount(message: LinkAccountEventMessage): Promise<void> {
    // console.log("Event: linkAccount ", message);
  }
}

export default events;
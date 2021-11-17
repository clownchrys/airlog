import { inspect } from "util";
import { ConnectionOptions } from "tls";
import { Session, User } from "next-auth";
import { Adapter } from "next-auth/adapters"
import { AppOptions } from "next-auth/internals";
import { AdapterInstance } from "next-auth/adapters";
import { TypeORMAdapterModels } from "@next-auth/typeorm-legacy-adapter";
import { CommonProfile, decodeEmail } from "src/lib/next-auth/common";

const inspectOptions = {
  showHidden: false,
  depth: null
}

const TestUser: User = {
  email: "email",
  name: "name",
  image: null,
}

const TestSession: Session = {
}

const adapter: Adapter<ConnectionOptions | string, { models?: TypeORMAdapterModels }, User, CommonProfile, Session> = (
  client: ConnectionOptions | string,
  options?: { models?: TypeORMAdapterModels } | undefined
) => {
  return {
    async getAdapter(appOptions?: AppOptions): Promise<AdapterInstance> {
      return {
        // your adapter methods here

        // User
        /** Call Order
         * 1. getUserByProviderAccountId
         * 2. getUserByEmail
         * if not exists: createUser (with linkAccount)
         * */
        async createUser (profile: CommonProfile): Promise<User> {
          console.log("Adapter: createUser", inspect({ profile }, inspectOptions))
          return TestUser;
        },
        async getUser (id: string): Promise<User | null> {
          console.log("Adapter: getUser", inspect({ id }, inspectOptions))
          return TestUser;
        },
        async getUserByEmail (email: string | null): Promise<User | null> {
          console.log("Adapter: getUserByEmail", inspect({ email }, inspectOptions))
          if (email) {
            const data = decodeEmail(email);
          }
          return null; // Not using: to handle single email with multiple
        },
        async getUserByProviderAccountId (
          providerId: string,
          providerAccountId: string
        ): Promise<User | null> {
          console.log("Adapter: getUserByProviderAccountId", inspect({ providerId, providerAccountId }, inspectOptions))
          return null
        },
        async updateUser (user: User) {
          console.log("Adapter: updateUser", inspect({ user }, inspectOptions))
          return TestUser;
        },
        // ** required at future release
        // async deleteUser (userId: string): Promise<void> {
        //   console.log("***************** deleteUser called")
        // },

        // Account
        async linkAccount (
          userId: string,
          providerId: string,
          providerType: string,
          providerAccountId: string,
          refreshToken: string | undefined,
          accessToken: string | undefined,
          accessTokenExpires: null | undefined
        ): Promise<void>
        {
          console.log("Adapter: linkAccount", inspect({
            userId,
            providerId,
            providerType,
            providerAccountId,
            refreshToken,
            accessToken,
            accessTokenExpires,
          }, inspectOptions))
        },
        // ** required at future release
        // async unlinkAccount (
        //   userId: string,
        //   providerId: string,
        //   providerAccountId: string
        // ): Promise<void> {
        //   console.log("***************** unlinkAccount called")
        // },

        // Session
        async createSession (user: User) {
          console.log("Adapter: createSession", inspect({ user }, inspectOptions))
          return TestSession
        },
        async getSession (sessionToken: string) {
          console.log("Adapter: getSession", inspect({ sessionToken }, inspectOptions))
          return null
        },
        async updateSession (
          session: Session,
          force: boolean | undefined
        ) {
          console.log("Adapter: updateSession", inspect({ session, force }, inspectOptions))
          return null
        },
        async deleteSession (sessionToken: string): Promise<void> {
          console.log("Adapter: deleteSession", inspect({ sessionToken }, inspectOptions))
        },

/*
        // Verify
        // These methods are required to support email / passwordless sign in
        async createVerificationRequest (
          identifier: string,
          url: string,
          token: string,
          secret: string,
          provider: EmailConfig & { from: string, maxAge: number }
        ): Promise<void> {
          console.log("***************** createVerificationRequest called")
          // return null
        },
        async getVerificationRequest (
          identifier: string,
          token: string,
          secret: string,
          provider: Required<EmailConfig>
        ) {
          console.log("***************** getVerificationRequest called")
          return null
        },
        async deleteVerificationRequest (
          identifier: string,
          token: string,
          secret: string,
          provider: Required<EmailConfig>
        ): Promise<void> {
          console.log("***************** deleteVerificationRequest called")
          // return null
        }
*/

      }
    },
  }
}
export default adapter;
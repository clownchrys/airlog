import NextAuth, { NextAuthOptions } from 'next-auth';
import Providers from "next-auth/providers";
import { NaverOptions, KakaoOptions, GoogleOptions } from "src/lib/next-auth/providers";
import events from "src/lib/next-auth/events";
import callbacks from "src/lib/next-auth/callbacks";

const options: NextAuthOptions = {
  providers: [
    Providers.Naver(NaverOptions),
    Providers.Kakao(KakaoOptions),
    Providers.Google(GoogleOptions)
  ],

  // routes
  pages: {
    // signIn: "/auth/login",
    error: "/auth/login",
    newUser: undefined,
  },

  // database
  // database: process.env.MARIA_DB,
  database: {
    type: "mariadb",
    host: "mariadb",
    port: 3306,
    database: "airlog",
    username: "admin",
    password: "admin",
  },

  // security
  secret: process.env.NEXTAUTH_SECRET_KEY,
  session: {
    jwt: true,
    // FIXME: 세션 유지시간 조정
    maxAge: 3600 * 24
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET_KEY,
    // signingKey: "NEXTAUTH_JWT_SIGN_KEY",
    // encryptionKey: "NEXTAUTH_JWT_ENC_KEY",
    verificationOptions: {
      algorithms: [ "HS512" ],
    },
    encryption: true,
  },
  useSecureCookies: process.env.NEXT_PUBLIC_BASE_URL?.startsWith("https"),

  // process
  callbacks: callbacks,
  events: events,

  // etc
  debug: true,
};

// export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
export default NextAuth(options);

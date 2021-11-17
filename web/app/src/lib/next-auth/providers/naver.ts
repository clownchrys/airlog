import { TokenSet } from "next-auth";
import { Awaitable } from "next-auth/internals/utils";
import { OAuthConfig } from "next-auth/providers";
import { CommonProfile, encodeEmail, PROVIDER_IDS } from "src/lib/next-auth/common";

const PROVIDER_ID = PROVIDER_IDS.NAVER;

type NaverResource = {
  resultcode: "00",
  message: "success",
  response: {
    id: string,
    age: string, // age-range
    gender: "M" | "F",
    email: string,
    mobile: string, // 010-0000-0000
    mobile_e164: string, // +821000000000
    name: string,
    birthyear: string
  }
}

const NaverOptions: Partial<OAuthConfig> = {
  id: PROVIDER_ID,
  clientId: process.env.NAVER_CLIENT_ID,
  clientSecret: process.env.NAVER_CLIENT_SECRET,

  profile(profile: NaverResource, tokens: TokenSet): Awaitable<CommonProfile> {
    // console.log("Provider: profile", inspect({ profile,  tokens }, { showHidden: false, depth: null }));
    return {
      id: profile.response.id,
      name: profile.response.name,
      email: encodeEmail(profile.response.email, PROVIDER_ID),
      image: undefined,
    }
  }
};

export default NaverOptions;
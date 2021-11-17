import { TokenSet } from "next-auth";
import { Awaitable } from "next-auth/internals/utils";
import { OAuthConfig } from "next-auth/providers";
import { CommonProfile, encodeEmail, PROVIDER_IDS } from "src/lib/next-auth/common";

const PROVIDER_ID = PROVIDER_IDS.GOOGLE;

type GoogleResource = {
  id: string,
  email: string,
  verified_email: boolean,
  name: string,
  given_name: string,
  family_name: string,
  picture: string,
  locale: "ko"
}

const GoogleOptions: Partial<OAuthConfig> = {
  id: PROVIDER_ID,
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,

  profile(profile: GoogleResource, tokens: TokenSet): Awaitable<CommonProfile> {
    // console.log("Provider: profile", inspect({ profile, tokens }, { showHidden: false, depth: null }));
    return {
      id: profile.id,
      name: profile.name,
      email: encodeEmail(profile.email, PROVIDER_ID),
      image: profile.picture,
    }
  }
};

export default GoogleOptions;
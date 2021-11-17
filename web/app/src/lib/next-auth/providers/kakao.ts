import { TokenSet } from "next-auth";
import { Awaitable } from "next-auth/internals/utils";
import { OAuthConfig } from "next-auth/providers";
import { CommonProfile, encodeEmail, PROVIDER_IDS } from "src/lib/next-auth/common";

const PROVIDER_ID = PROVIDER_IDS.KAKAO;

type KakaoResource =  {
  id: number,
  connected_at: string,
  properties: {
    nickname: string,
    profile_image: string,
    thumbnail_image: string
  },
  kakao_account: {
    profile_nickname_needs_agreement: boolean,
    profile_image_needs_agreement: boolean,
    profile: {
      nickname: string,
      thumbnail_image_url: string,
      profile_image_url: string,
      is_default_image: boolean
    },
    has_email: boolean,
    email_needs_agreement: boolean,
    is_email_valid: boolean,
    is_email_verified: boolean,
    email: string,
  }
}

const KakaoOptions: Partial<OAuthConfig> = {
  id: PROVIDER_ID,
  clientId: process.env.KAKAO_REST_KEY,
  clientSecret: process.env.KAKAO_REST_SECRET,

  profile(profile: KakaoResource, tokens: TokenSet): Awaitable<CommonProfile> {
    // console.log("Provider: profile", inspect({ profile,  tokens }, { showHidden: false, depth: null }));
    return {
      id: profile.id.toString(),
      name: profile.properties.nickname,
      email: encodeEmail(profile.kakao_account.email, PROVIDER_ID),
      image: profile.properties.profile_image,
    }
  }
};

export default KakaoOptions;
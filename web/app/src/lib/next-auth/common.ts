import { Profile } from "next-auth";

const EMAIL_SEPARATOR = "::";

export enum PROVIDER_IDS {
  NAVER = "naver",
  KAKAO = "kakao",
  GOOGLE = "google",
  FACEBOOK = "facebook"
}

export interface CommonProfile extends Profile {
  id: string,
  // providerId: ProviderIds
}

export function encodeEmail(email: string, providerId: PROVIDER_IDS): string {
  return `${ email }${ EMAIL_SEPARATOR }${ providerId }`;
}

export function decodeEmail(enc: string): { email: string, providerId: PROVIDER_IDS } {
  let [ email, providerId ] = enc.split(EMAIL_SEPARATOR, 2);
  return { email, providerId: providerId as PROVIDER_IDS };
}


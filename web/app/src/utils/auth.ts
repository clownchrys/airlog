import { Session } from "next-auth";

export function checkSession(session: Session | null, hasAuth: boolean, callback: () => void) {
  if (!session) {
    alert("로그인이 필요합니다");
  } else if (!hasAuth) {
    alert("권한이 없습니다");
  } else {
    callback();
  }
}

export type CookieOptions = {
  httpOnly?: true,
  secure?: true,
  sameSite?: "strict" | "lax" | "none",
  sameParty?: true,
  priority?: "medium" | "high" | "low"
};

 export type CookieConfig = {
  maxAge?: number,
  expires?: Date,
  path?: string,
  domain?: string,
  options?: CookieOptions
}

export function makeCookie(key: string, value: string, config?: CookieConfig): string {
  let ret = `${ key }=${ value };`;
  if ( config === undefined)
    return ret;

  const { maxAge, expires, path, domain, options } = config;
  ret += ( maxAge !== undefined ) ? `max-age=${ maxAge };` : "";
  ret += ( expires !== undefined ) ? `expires=${ expires.toUTCString() };` : "";
  ret += ( path !== undefined ) ? `path=${ path };` : "";
  ret += ( domain !== undefined ) ? `domain=${ domain };` : "";
  if ( options === undefined )
    return ret;

  const { httpOnly, secure, sameSite, sameParty, priority } = options;
  ret += ( httpOnly !== undefined ) ? "HttpOnly;" : "";
  ret += ( secure !== undefined ) ? "Secure;" : "";
  ret += ( sameSite !== undefined ) ? `SameSite=${ sameSite };` : "";
  ret += ( sameParty !== undefined ) ? `SameParty;` : "";
  ret += ( priority !== undefined ) ? `Priority=${ priority };` : "";
  return ret;
}

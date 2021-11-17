import { useRouter } from "next/router";

export default function Error () {
  const router = useRouter();

  const error = router.query.error;
  /* const errors = {
     Signin: "Try signing with a different account.",
     OAuthSignin: "Try signing with a different account.",
     OAuthCallback: "Try signing with a different account.",
     OAuthCreateAccount: "Try signing with a different account.",
     EmailCreateAccount: "Try signing with a different account.",
     Callback: "Try signing with a different account.",
     OAuthAccountNotLinked:
       "To confirm your identity, sign in with the same account you used originally.",
     EmailSignin: "Check your email address.",
     CredentialsSignin:
       "Sign in failed. Check the details you provided are correct.",
     default: "Unable to sign in.",
    };
  */
  const errorTypes: any[] = [
    "Callback", // Callback 메서드에서 비정상 처리 (return false 등)
    "AccessDenied", //
    "OAuthAccountNotLinked", //
  ];
  let message = `NextAuth Error occurred: ${ error }`;
  message += (!errorTypes.includes(error)) ? "\n(not gathered error)" : "";

  return <>
    <p style={{ fontWeight: "bold" }}>Error Description</p>
    <p>{ message }</p>
  </>
}

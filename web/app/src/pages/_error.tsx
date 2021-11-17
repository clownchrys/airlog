import { useRouter } from "next/router";
import { NextPageContext } from "next";

type PropType = {
  statusCode?: number,
  errMessage?: string;
}

export default function Error ({ statusCode, errMessage }: PropType) {
  const router = useRouter();
  let message;

  if (router.query.cause === "auth") {
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
 }; */
    const errorTypes: any[] = [
      "Callback", // Callback 메서드에서 비정상 처리 (return false 등)
      "AccessDenied", //
      "OAuthAccountNotLinked", //
    ];
    message = `NextAuth Error occurred: ${ error }`;
    if ( !errorTypes.includes(error) ) message += "\n(not gathered error)"
  } else if (errMessage) {
    message = `Unexpected error occurred on server: ${ errMessage } (${ statusCode })`;
  } else if (statusCode) {
    message = `Unexpected error occurred on server: ${ statusCode }`;
  } else {
    message = `Unexpected error occurred on client`;
  }

  return <>
    <p style={{ fontWeight: "bold" }}>Error Description</p>
    <p>{ message }</p>
  </>
}

Error.getInitialProps = ({ res, err }: NextPageContext): PropType => {
  const props: PropType = {
    statusCode: res ? res.statusCode : (err ? err.statusCode : 404),
    errMessage: err?.message
  };
  return props;
};

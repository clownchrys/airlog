import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { NotImplemented } from "src/utils/callbacks";
import { PROVIDER_IDS } from "src/lib/next-auth/common";
import LoadingComponent from "src/components/LoadingComponent";

const LoginButton = styled.button<{ bgColor: string, fontColor: string, border?: string }>`
  width: 50%;
  min-width: 300px;
  height: 60px;
  margin: 5px;
  border-radius: 15px;
  border: ${ props => props.border ?? "none" };
  background: ${ props => props.bgColor };
  color: ${ props => props.fontColor };
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
`;

type LoginProps = {
  close?: () => void
}

export default function Login({ close }: LoginProps) {
  const [ session, isLoading ] = useSession();
  const router = useRouter();

  const onLoginBtnClicked = (provider: PROVIDER_IDS) => () => {
    signIn(provider, { redirect: false })
      .then(() => close ? close() : (() => {})())
      .catch((err: Error) => {
        console.log(err);
        alert("알 수 없는 오류로 로그인에 실패했습니다");
      })
  }

  if (isLoading) {
    return <LoadingComponent desc="로그인 세션을 확인하는 중입니다" vSpace={ 200 }/>
  } else if (session?.user?.email) {
    window.history.length > 0 ? router.back() : router.push("/");
    return <></>;
  }

  return <div style={ { height: "fit-content", padding: 50, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 } }>
    <h1 style={ { marginBottom: 50 } }>로그인</h1>

    <LoginButton bgColor={ "#7FCC5A" } fontColor={ "white" } onClick={ onLoginBtnClicked(PROVIDER_IDS.NAVER) }>
      네이버
    </LoginButton>
    <LoginButton bgColor={ "#FAEA5C" } fontColor={ "black" } onClick={ onLoginBtnClicked(PROVIDER_IDS.KAKAO) }>
      카카오
    </LoginButton>
    <LoginButton bgColor={ "#ffffff" } fontColor={ "black" } border={ "0.1px solid" } onClick={ NotImplemented }>
      구글
    </LoginButton>
    <LoginButton bgColor={ "#4D74D6" } fontColor={ "white" } onClick={ NotImplemented }>
      페이스북
    </LoginButton>
    <LoginButton bgColor={ "#C64FD9" } fontColor={ "white" } onClick={ NotImplemented }>
      인스타그램
    </LoginButton>
  </div>;
}

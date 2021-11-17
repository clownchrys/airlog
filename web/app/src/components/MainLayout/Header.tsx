import React, { useState } from "react";
import Link from "next/link";
import { Button, Modal } from "antd";
import { RocketTwoTone, SearchOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/client";
import { Media, ResponsiveProps } from "src/lib/fresnel";
import { decodeEmail } from "src/lib/next-auth/common";
import LoadingComponent from "src/components/LoadingComponent";
import Login from "src/pages/login";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div<{ height: number, alignCenter: boolean }>`
  display: flex;
  justify-content: ${ props => props.alignCenter ? "center" : "space-between" };
  align-content: center;
  height: ${ props => props.height }px;
`;

const Division = styled.div<{ gap: number }>`
  display: flex;
  align-items: center;
  gap: ${ props => props.gap }px;
`;

const transition = css`
  transition: all .3s;
`;

function BrowseButton({ isMobile }: ResponsiveProps) {
  const style: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: isMobile ? "0.9rem" : "1rem",
    color: "rgba(0,0,0,0.7)",
    border: "none"
  };
  return (
    <Link href="/browse" passHref>
      <Button type="link" shape="round" icon={ <SearchOutlined/> } style={ style } css={ transition }>
        찾아보기
      </Button>
    </Link>
  )
}

function SessionInfo({ session, isMobile }: { session: Session } & ResponsiveProps) {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    fontSize: isMobile ? "0.8rem" : "0.9rem"
  };
  return (
    <div style={ containerStyle }>
      <span css={ transition }>{ decodeEmail(session.user?.email ?? "").email }</span>
      <Button type="link" onClick={ () => signOut() } style={ { padding: 0, color: "red" } }>로그아웃</Button>
    </div>
  )
}

function LoginButton({ onClick }: { onClick: React.MouseEventHandler<HTMLElement> }) {
  const style: React.CSSProperties = {
    fontSize: "1.1rem",
    padding: "0 30px"
  };
  return (
    <Button type="link" onClick={ onClick } style={ style }>
      로그인
    </Button>
  )
}

function Logo({ isMobile }: ResponsiveProps) {
  const iconStyle: React.CSSProperties = {
    fontSize: isMobile ? "2rem" : "2.5rem",
    transform: "rotate(30deg)"
  }
  const textStyle: React.CSSProperties = {
    fontSize: isMobile ? "1.2rem" : "1.5rem"
  }
  return (
    <Division gap={ 10 }>
      <Link href="/" passHref>
        <a>
          <RocketTwoTone style={ iconStyle } css={ transition }/>
        </a>
      </Link>
      <Link href="/" passHref>
        <a>
          <span style={ textStyle } css={ transition }>AirLog</span>
        </a>
      </Link>
    </Division>
  )
}

export default function Header() {
  const [ session, isLoading ] = useSession();
  const [ loginModalVisible, setLoginModalVisible ] = useState<boolean>(false);

  return (
    <Container>
      {/* Mobile */}
      <Media lessThan="md">
        <Row height={ 30 } alignCenter={ true } css={{ marginTop: 20 }}>
          {/* Logo */}
          <Logo isMobile={ true }/>
        </Row>

        <Row height={ 50 } alignCenter={ false } css={ transition }>
          {/* Browse */}
          <Division gap={ 0 }>
            <BrowseButton isMobile={ true } />
          </Division>

          {/* Login */}
          <Division gap={ 10 }>
            { isLoading && <LoadingComponent desc=""/> }
            {
              !isLoading && session
                ? <SessionInfo session={ session } isMobile={ true }/>
                : <LoginButton onClick={ () => setLoginModalVisible(true) }/>
            }
          </Division>
        </Row>
      </Media>

      {/* PC */}
      <Media greaterThanOrEqual="md">
        <Row id="2nd" height={ 80 } alignCenter={ false } css={ transition }>
          {/* Logo */}
          <Logo isMobile={ false }/>

          {/* Browse */}
          <Division gap={ 0 }>
            <BrowseButton isMobile={ false } />
          </Division>

          {/* Login */}
          <Division gap={ 10 }>
            { isLoading && <LoadingComponent desc=""/> }
            {
              !isLoading && session
                ? <SessionInfo session={ session } isMobile={ false }/>
                : <LoginButton onClick={ () => setLoginModalVisible(true) }/>
            }
          </Division>
        </Row>
      </Media>

      {/* Login Modal */}
      <Modal
        visible={ loginModalVisible }
        onOk={ () => setLoginModalVisible(false) }
        onCancel={ () => setLoginModalVisible(false) }
        width={ 800 }
        footer={ null }
        centered
      >
        <Login close={ () => setLoginModalVisible(false) }/>
      </Modal>
    </Container>
  )
}

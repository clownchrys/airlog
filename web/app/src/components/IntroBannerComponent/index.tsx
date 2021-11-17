import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  background-blend-mode: darken;
  background-image: url("https://cdn.wallpapersafari.com/35/36/AfwJrF.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  background-attachment: scroll;

  width: 100%;
  height: 350px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-around;
  transition: all .3s;
  @media screen and (max-width: 768px) {
    height: 250px;
    padding: 20px;
  }

  #title {
    color: white;
    font-size: 1.8rem;
    margin: 0;
    @media screen and (max-width: 768px) {
      font-size: 1.3rem;
    }
  }

  #desc {
    color: white;
    margin: 0;
    font-weight: 400;
    font-size: 1.2rem;
    text-align: center;
    line-height: 2.5rem;
    @media screen and (max-width: 768px) {
      font-size: 0.8rem;
      line-height: 1.5rem;
    }
  }

  #join {
    margin: 0;
    border: none;
    padding: 10px 40px;
    font-size: 1.2rem;
    background-color: white;
    border-radius: 5px;
    cursor: pointer;
    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

export default function IntroBannerComponent() {
  const router = useRouter();
  return <Container>
    <h3 id="title">Be Smart To Enjoy</h3>
    <p id="desc">즐기세요!<br/>현명한 당신의 덕질 라이프</p>
    <button id="join" onClick={() => router.push("/login") }>Join Now</button>
  </Container>
}

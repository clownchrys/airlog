import Head from 'next/head';
import IntroBannerComponent from "src/components/IntroBannerComponent";
import React from "react";
import IntroFeatureComponent from "src/components/IntroFeatureComponent";
import { Carousel, Empty } from "antd";
import styled from "@emotion/styled";

const Division = styled.div`
  margin: 40px 0;
  transition: all .3s;
  
  @media screen and (max-width: 768px) {
    #title {
      font-size: 1.2rem;
    }
  }
`;

export default function Home() {
  const contentStyle: React.CSSProperties = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <div style={ { backgroundColor: "white" } }>
      <IntroBannerComponent/>
      <IntroFeatureComponent/>

      <Division>
        <h1 id="title">공지사항</h1>
        <Empty description="등록된 공지사항이 없어요!"/>
      </Division>

      <Division>
        <h1 id="title">주간 랭킹</h1>
        <Carousel adaptiveHeight draggable autoplay>
          {
            new Array(10).fill(null).map((value, index) =>
              <div key={ index }>
                <h1 style={ contentStyle }>{ index + 1 } 위</h1>
              </div>
            )
          }
        </Carousel>
      </Division>
    </div>
  )
}

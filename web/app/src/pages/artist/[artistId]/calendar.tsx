import React from "react";
import dynamic from "next/dynamic";
import { Empty, Spin } from "antd";
import ArtistLayout from "src/components/ArtistLayout";
import CalendarComponent from "src/components/CalendarComponent";
import { Media } from "src/lib/fresnel";

export default function ArtistCalendar() {
  const CalendarComponent = dynamic(import("src/components/CalendarComponent"), {
    loading() {
      return <Spin tip="달력을 불러오는 중 입니다..." style={{ width: "100%", height: 800, margin: "200px auto" }} spinning/>
    },
    ssr: false
  });

  return (
    <>
      <Media lessThan="md">
        <Empty description="아직 모바일에서는 캘린더를 지원하지 않아요...ㅠ" style={ { margin: "30px 0" } }/>
      </Media>

      <Media greaterThanOrEqual="md">
        <CalendarComponent/>
      </Media>
    </>
  )
}

ArtistCalendar.Layout = ArtistLayout;
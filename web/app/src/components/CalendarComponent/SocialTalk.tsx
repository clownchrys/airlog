import React from "react";
import { css } from "@emotion/react";
import { Empty } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import TuiCalendar, { ISchedule } from "tui-calendar";
import ScheduleInfo from "./ScheduleInfo";
import { ViewType } from "./types";
import ScheduleReply from "./ScheduleReply";

const scheduleTalkSection = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
const paddingVertical = css`
  padding: 20px 0;
`;

export type SocialTalkProps = {
  handler: () => TuiCalendar
  currentViewType: ViewType
  currentSchedule: ISchedule | undefined
  displayCurrentDate: () => void
  toTargetDate: (date: Date, onTarget?: boolean) => void
}

/*
#1890ff
#40a9ff
*/
export default function SocialTalk({ currentViewType, currentSchedule, toTargetDate }: SocialTalkProps) {
  return <div css={ [ scheduleTalkSection, paddingVertical ] } style={{ padding: "0 20px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <TeamOutlined style={{ fontSize: "2rem", color: "white", backgroundColor: "#40a9ff", borderRadius: "50%", padding: 6 }}/>
        <h1 style={{ margin: "0 0 0 10px", display: "inline" }}>소셜톡</h1>
      </div>
    </div>

    { currentSchedule
      ? <>
        <ScheduleInfo scheduleId={ currentSchedule.id! } toTargetDate={ toTargetDate } currentViewType={ currentViewType }/>
        <ScheduleReply { ...currentSchedule }/>
      </>
      : <Empty description="선택한 스케쥴이 없어요...ㅠ"/>
    }
  </div>
}
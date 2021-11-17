import { ScheduleEntity } from "src/models/ScheduleEntity";
import { css } from "@emotion/react";
import { List } from "antd";
import React from "react";

export default function TodayScheduleItem({ id, title, calendar, start, end, isAllDay }: ScheduleEntity) {
  const ds = new Date(start);
  const now = new Date();
  const fmtTime: Intl.DateTimeFormatOptions = { hour12: false, timeStyle: "short" };
  const fmtDate: Intl.DateTimeFormatOptions = { ...fmtTime, dateStyle: "long" };

  const isStartToday = ds.toLocaleDateString("ko") === now.toLocaleDateString("ko");
  const displayDate = isStartToday
    ? (isAllDay ? "오늘" : ds.toLocaleTimeString("ko", fmtTime))
    : `${ ds.toLocaleDateString("ko") } 부터`;

  const defaultItem = css`
    .ant-list-item-meta-title {
      margin: 0;
    }
    .ant-list-item-action > li > p {
      margin: 0;
    }
    .ant-list-item-meta {
      align-items: center;
      justify-content: center;
    }
    * {
      color: ${ !isStartToday || ds < now ? "rgba(0, 0, 0, 0.2)" : "black" };
    }
  `;

  return <List.Item actions={ [ <p key={ id }>{ displayDate }</p> ] } css={ defaultItem }>
    <List.Item.Meta
      avatar={ <div style={ { width: 16, height: 16, borderRadius: "50%", backgroundColor: calendar.bgColor } }/> }
      title={ title }
    />
  </List.Item>
}

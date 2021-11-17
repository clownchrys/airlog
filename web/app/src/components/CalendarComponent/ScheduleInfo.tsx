import React, { CSSProperties } from "react";
import { css } from "@emotion/react";
import { Button } from "antd";
import { HeartFilled, HeartOutlined, ReloadOutlined, SelectOutlined } from "@ant-design/icons";
import { ViewType } from "./types";
import useSWR from "swr";
import CalendarRepository from "src/repositories/CalendarRepository";
import { useSession } from "next-auth/client";
import { ScheduleEntity } from "src/models/ScheduleEntity";
import LoadingComponent from "src/components/LoadingComponent";

const tabSectionCss = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  position: relative;
  border: 1px solid #00000030;
  border-radius: 2px;
`;

const tabNameCss = css`
  background-color: white;
  font-size: 0.8rem;
  position: absolute;
  padding: 0 10px;
  top: -10px;
  right: 10px;
`;

function getDateRange(start: string, end: string, isAllDay?: boolean) {
// function getDateRange(start?: DateType, end?: DateType, isAllDay?: boolean) {
  // const _start = (start as TZDate).toDate();
  // const _end = (end as TZDate).toDate();
  const _start = new Date(start);
  const _end = new Date(end);
  const dateOpt: Intl.DateTimeFormatOptions = { hour12: false, hourCycle: "h23" };
  const timeOpt: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" };

  const startDate = _start.toLocaleDateString(undefined, dateOpt);
  const endDate = _end.toLocaleDateString(undefined, dateOpt);
  const startTime = _start.toLocaleTimeString(undefined, { ...dateOpt, ...timeOpt });
  const endTime = _end.toLocaleTimeString(undefined, { ...dateOpt, ...timeOpt });

  if (startDate === endDate) {
    return isAllDay ? startDate : `${ startDate } ${ startTime } ~ ${ endTime }`;
  } else {
    return isAllDay ? `${ startDate } ~ ${ endDate }` : `${ startDate } ${ startTime } ~ ${ endDate } ${ endTime }`;
  }
}

export type ScheduleSpecProps = {
  scheduleId: string,
  toTargetDate: (date: Date, onTarget: boolean) => void
  currentViewType: ViewType
}

export default function ScheduleInfo({ scheduleId, toTargetDate, currentViewType }: ScheduleSpecProps) {
  const [ session, isLoading ] = useSession();

  const SWR_Schedule = useSWR<ScheduleEntity>(`Schedule-${ scheduleId }`, () => {
    return CalendarRepository.getSchedule(parseInt(scheduleId));
  }, { revalidateOnFocus: false });

  const SWR_IsLikeSchedule = useSWR<boolean>(`IsLikeSchedule-${ scheduleId }`, () => {
    return (session?.user?.email) ? CalendarRepository.isScheduleLike(parseInt(scheduleId), session.user.email) : false;
  }, { revalidateOnFocus: false, initialData: false });

  const SWR_LikeCount = useSWR<number>(`LikeCount-${ scheduleId }`, () => {
    return CalendarRepository.countScheduleLike(parseInt(scheduleId));
  }, { revalidateOnFocus: false, initialData: 0 });

  if (!SWR_Schedule.data) {
    return <p>No data...</p>
  }

  const {
    calendar: {
      id: calendarId,
      name: calendarName
    },
    start,
    end,
    title,
    isAllDay
  } = SWR_Schedule.data;

  const onClickLike = () => {
    let response: Promise<boolean>;

    if (!session?.user?.email) {
      return;
    } else if (SWR_IsLikeSchedule.data) {
      response = CalendarRepository.deleteScheduleLike(parseInt(scheduleId), session.user.email);
    } else {
      response = CalendarRepository.createScheduleLike(parseInt(scheduleId), session.user.email);
    }
    response
      .then(SWR_LikeCount.revalidate)
      .then(SWR_IsLikeSchedule.revalidate)
      .catch((err: Error) => {
        console.log(err);
        alert("좋아요 상태 변경에 실패했습니다");
      });
  }

  const onClickGoto = () => {
    toTargetDate(new Date(start), currentViewType !== "Month");
  };

  const onRefresh = () => {
    SWR_Schedule.revalidate();
    SWR_IsLikeSchedule.revalidate();
    SWR_LikeCount.revalidate();
  }

  if (SWR_IsLikeSchedule.isValidating || SWR_LikeCount.isValidating || isLoading) {
    return <LoadingComponent desc="데이터를 불러오는중 입니다..." height={ 400 } vSpace={ 100 } isLoading/>
  }

  const attrs10: CSSProperties = { margin: 0, fontSize: "1rem", overflowWrap: "break-word", maxWidth: 200 };
  const attrs07: CSSProperties = { margin: 0, fontSize: "0.7rem" };

  return (
    <div css={ tabSectionCss }>
      <div css={ tabNameCss }>스케쥴 정보</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={ {
            width: 14,
            height: 14,
            display: "inline-block",
            borderRadius: "50%",
            border: "none",
            backgroundColor: SWR_Schedule.data.calendar.bgColor
          } }/>
          <h2 style={ attrs10 }>{ title }</h2>
        </div>
        <Button
          icon={ <ReloadOutlined /> }
          shape="circle"
          onClick={ onRefresh }
        />
      </div>

      <p style={ attrs07 }>ID: { scheduleId }</p>
      <p style={ attrs07 }>분류: { calendarName }</p>
      <p style={ attrs07 }>종일 일정: { isAllDay ? "O" : "X" }</p>
      <p style={ attrs07 }>{ getDateRange(start, end, isAllDay) }</p>

      <div style={ { display: "flex", gap: "10px" } }>
        <Button
          icon={ <SelectOutlined/> }
          onClick={ onClickGoto }
          style={ { width: "100%" } }
        />
        <Button
          icon={ SWR_IsLikeSchedule.data ? <HeartFilled style={ { color: "red" } }/> : <HeartOutlined/> }
          onClick={ onClickLike }
          style={ { width: "100%" } }
        >{ (SWR_LikeCount.data ?? 0).toString() }</Button>
      </div>
    </div>
  );
}

import Calendar from "@toast-ui/react-calendar";
import TuiCalendar, {
  ICalendarInfo,
  IEventObject,
  IEventScheduleObject,
  IEventWithCreationPopup,
  ISchedule,
  TEventBeforeCreateSchedule
} from "tui-calendar";
import React, { createRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { css } from "@emotion/react";

import FilterSection from "./FilterSection";
import CalendarHeader from "./CalendarHeader";
import SocialTalk from "./SocialTalk";

import { ViewType } from "./types";
import IScheduleAdapter from "src/adapters/IScheduleAdapter";
import ScheduleEntityAdapter from "src/adapters/ScheduleEntityAdapter";
import CalendarRepository from "src/repositories/CalendarRepository";
import ScheduleCalendarEntityAdapter from "src/adapters/ScheduleCalendarEntityAdapter";
import { Drawer } from "antd";
import LoadingComponent from "src/components/LoadingComponent";

const grid = css`
  display: grid;
  grid-template-columns: 20% 75%;
  gap: 0 5%;
  height: fit-content;
  width: 100%;
  margin: 30px auto;
`;

export default function CalendarComponent() {
  // 1. Hooks
  const ref = createRef<Calendar>();
  const [ calendars, setCalendars ] = useState<ICalendarInfo[]>();
  const [ schedules, setSchedules ] = useState<ISchedule[]>();
  const [ displayDate, setDisplayDate ] = useState<string>("");
  const [ currentSchedule, setCurrentSchedule ] = useState<ISchedule>();
  const [ currentViewType, setCurrentViewType ] = useState<ViewType>("Month");
  const [ isVisibleTalk, setIsVisibleTalk ] = useState<boolean>(false);

  const [ session, isLoading ] = useSession();
  const { query: { artistId } } = useRouter<{ artistId: string }>();

  useEffect(() => {
    CalendarRepository.getCalendarList().then((entityList) =>
      setCalendars(entityList.map(ScheduleCalendarEntityAdapter.toICalendarInfo)));
    CalendarRepository.getScheduleList(parseInt(artistId)).then((entityList) =>
      setSchedules(entityList.map(ScheduleEntityAdapter.toISchedule)));
  }, [ artistId ]);

  // 2. Def helpers
  const runHandler = () => ref.current?.getInstance() ?? {} as TuiCalendar;
  const onCloseTalk = () => setIsVisibleTalk(false);

  function displayCurrentDate() {
    const date = runHandler().getDate().toDate();
    const view = runHandler().getViewName();
    if (view === "month") {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      setDisplayDate(`${ year }년 ${ month }월`);
    }
  }

  function toTargetDate(date: Date, onTarget?: boolean) {
    const target = onTarget ? date : new Date(date.getFullYear(), date.getMonth());
    runHandler().setDate(target);
    displayCurrentDate();
  }

  // 3. Def callbacks
  function onClickSchedule({ schedule }: IEventScheduleObject) {
    setCurrentSchedule(schedule);
    setIsVisibleTalk(true)
  }

  function onBeforeCreateSchedule(ev: TEventBeforeCreateSchedule) {
    const { calendarId, title, start, end, isAllDay, state, location, raw } = ev as IEventWithCreationPopup & Pick<ISchedule, "raw">;
    const schedule: ISchedule = {
      title, start, end, isAllDay, state, location, raw,
      calendarId: calendarId ? calendarId.toString() : undefined
    };

    const createEntity = (artistId && session?.user?.email)
      ? IScheduleAdapter.toScheduleEntityCreate(schedule, session.user.email, parseInt(artistId))
      : undefined;

    if (createEntity) {
      CalendarRepository.createSchedule(createEntity)
        .then((entity) => {
          runHandler().createSchedules([ ScheduleEntityAdapter.toISchedule(entity) ]);
        })
        .catch((err: Error) => {
          console.log("catch", err);
          alert("새 스케쥴 등록 요청에 실패했습니다");
        });
    } else {
      alert("새 스케쥴을 등록할 수 없습니다 (Unexpected)");
    }
  }

  function onBeforeUpdateSchedule({ schedule, changes }: IEventObject) {
    const { id: scheduleId, calendarId } = schedule;

    if (scheduleId && calendarId && session?.user?.email && changes) {
      const updateEntity = IScheduleAdapter.toScheduleEntityUpdate({ ...schedule, ...changes }, session.user.email);

      CalendarRepository.updateSchedule(parseInt(scheduleId), updateEntity)
        .then((entity) => {
          const schedule = ScheduleEntityAdapter.toISchedule(entity);
          runHandler().updateSchedule(scheduleId, calendarId, schedule, false);
          setCurrentSchedule(schedule);
        })
        .catch((err: Error) => {
          console.log("catch", err);
          alert("스케쥴 업데이트 요청에 실패했습니다");
        });
    } else {
      alert("스케쥴을 업데이트할 수 없습니다 (Unexpected)");
    }
  }

  function onBeforeDeleteSchedule({ schedule: { calendarId, id: scheduleId } }: IEventScheduleObject) {
    if (scheduleId && calendarId) {
      CalendarRepository.deleteSchedule(parseInt(scheduleId))
        .then(() => runHandler().deleteSchedule(scheduleId, calendarId))
        .catch((err: Error) => {
          console.log("catch", err);
          alert("스케쥴 삭제 요청에 실패했습니다");
        });
    } else {
      alert("스케쥴을 삭제할 수 없습니다 (Unexpected)");
    }
  }

  // 4. initialize
  if (isLoading || !calendars || !schedules) {
    return <LoadingComponent desc= "일정을 불러오는 중입니다..." height={ 800 } vSpace={ 200 }/>
  }


  return <>
    <div css={ grid }>
      <FilterSection handler={ runHandler } calendars={ calendars ?? [] }/>

      <div style={ { display: "flex", flexDirection: "column", gap: 10 } }>
        <CalendarHeader
          handler={ runHandler }
          displayDate={ displayDate }
          stateCurrentViewType={ [ currentViewType, setCurrentViewType ] }
          displayCurrentDate={ displayCurrentDate }
          toTargetDate={ toTargetDate }
        />
        <Calendar
          ref={ ref }
          height="800px"
          view="month"
          calendars={ calendars }
          schedules={ schedules }
          template={ {
            titlePlaceholder: () => "Schedule",
            locationPlaceholder: () => "Link or Location"
          } }
          onClickSchedule={ onClickSchedule }
          onBeforeCreateSchedule={ onBeforeCreateSchedule }
          // onAfterRenderSchedule={ onAfterRenderSchedule }
          onBeforeDeleteSchedule={ onBeforeDeleteSchedule }
          onBeforeUpdateSchedule={ onBeforeUpdateSchedule }
          useCreationPopup
          useDetailPopup
          usageStatistics={ false }
        />
      </div>

      <Drawer placement="right" width={ 600 } onClose={ onCloseTalk } visible={ isVisibleTalk }>
        <SocialTalk
          handler={ runHandler }
          currentViewType={ currentViewType }
          currentSchedule={ currentSchedule }
          displayCurrentDate={ displayCurrentDate }
          toTargetDate={ toTargetDate }
        />
      </Drawer>

    </div>
  </>;
}
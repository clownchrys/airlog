import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { css } from "@emotion/react";
import TuiCalendar, { ICalendarInfo } from "tui-calendar";

const filterSection = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 20px 0;
`;

const calendarToggle = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const getBullets = (calendarId: string, calendarSelector: Record<string, boolean>, calendars: ICalendarInfo[]) => {
  const CAL_TO_COLOR = Object.fromEntries(calendars.map(({ id, bgColor }) => [ id, bgColor ]));
  return css`
    width: 14px;
    height: 14px;
    display: inline-block;
    border-radius: 50%;
    border: 2px solid ${ CAL_TO_COLOR[calendarId] ?? "none" };
    background-color: ${ calendarSelector[calendarId] ? CAL_TO_COLOR[calendarId] ?? "none" : "transparent" };
  `;
}

export type FilterSectionProps = {
  handler: () => TuiCalendar
  calendars: ICalendarInfo[]
}

export default function FilterSection({ handler, calendars }: FilterSectionProps) {
  const [ calendarSelector, setCalendarSelector ] = useState<Record<string, boolean>>(
    Object.fromEntries(calendars.map(({ id }) => [ id, true ]))
  );

  const onChangeChecked = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.stopPropagation();
    const { checked } = ev.target;
    const entries = Object.entries(calendarSelector).map(([ id ]) => {
      handler().toggleSchedules(id, !checked, true);
      return [ id, checked ];
    });
    setCalendarSelector(Object.fromEntries(entries));
  }

  const onClickCalendarToggle = (id: ICalendarInfo["id"]) => () => {
    handler().toggleSchedules(id, calendarSelector[id], true);
    setCalendarSelector({ ...calendarSelector, [id]: !calendarSelector[id] });
  }

  return (
    <div css={ filterSection }>
      <Button type="primary" shape="round" size="large"
              icon={ <PlusCircleOutlined/> }
              style={ { margin: "10px 20px 10px 0" } }
              onClick={ () => handler().openCreationPopup({}) }
              danger>
        새 일정 추가하기
      </Button>

      <div style={ { display: "flex", alignItems: "center", gap: "10px", padding: "20px 0" } }>
        <input type="checkbox" onChange={ onChangeChecked } defaultChecked/>전체보기
      </div>

      {
        calendars.map(({ id, name }) =>
          <div key={ id } css={ calendarToggle } onClick={ onClickCalendarToggle(id) }>
            <div css={ getBullets(id, calendarSelector, calendars) }/>
            { name }
          </div>
        )
      }
    </div>
  )
}
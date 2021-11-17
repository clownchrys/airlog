import TuiCalendar from "tui-calendar";
import { Button, Dropdown, Menu } from "antd";
import { DownOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { css } from "@emotion/react";
import { ViewType, ViewTypeSet } from "./types";

const infoSection = css`
  //grid-area: info;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    margin: 0;
  }
`;

const ALL_VIEWS: ViewTypeSet = [ "Month", "1 Week", "2 Weeks", "3 Weeks" ];

export type CalendarHeaderProps = {
  handler: () => TuiCalendar
  displayDate: string
  stateCurrentViewType: [ ViewType, Dispatch<SetStateAction<ViewType>> ]
  displayCurrentDate: () => void
  toTargetDate: (date: Date, onTarget?: boolean) => void
}

export default function CalendarHeader(props: CalendarHeaderProps) {
  const {
    handler,
    displayDate,
    stateCurrentViewType: [ currentViewType, setCurrentViewType ],
    displayCurrentDate,
    toTargetDate
  } = props;

  useEffect(() => {
    displayCurrentDate();
  }, [ displayCurrentDate ])

  function onClickMenuItem(key: ViewType) {
    return () => {
      const visibleWeeksCount: Record<ViewType, number> = { Month: 6, "1 Week": 1, "2 Weeks": 2, "3 Weeks": 3 }
      if (key === "Month") {
        toTargetDate(handler().getDate().toDate(), false);
      }
      handler().setOptions({ month: { visibleWeeksCount: visibleWeeksCount[key] } }, true);
      handler().changeView("month", true);
      setCurrentViewType(key);
    };
  }

  const MenuOverlay = (
    <Menu>
      {
        ALL_VIEWS.map((value, index) => (
          <Menu.Item key={ index } disabled={ currentViewType === value }>
            <a onClick={ onClickMenuItem(value) }>{ value }</a>
          </Menu.Item>
        ))
      }
    </Menu>
  )

  return (
    <div css={ infoSection }>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <h1 style={ { display: "inline" } }>{ displayDate }</h1>
        <Dropdown overlay={ MenuOverlay }>
          <a className="ant-dropdown-link" onClick={ e => e.preventDefault() }>{ currentViewType } <DownOutlined /></a>
        </Dropdown>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <Button shape="circle" icon={ <LeftOutlined/> } onClick={ () => {
          handler().prev();
          displayCurrentDate();
        } }/>
        <Button shape="circle" icon={ <RightOutlined/> } onClick={ () => {
          handler().next();
          displayCurrentDate();
        } }/>
        <Button type="primary" shape="round" onClick={ () => {
          toTargetDate(new Date(), currentViewType !== "Month");
        } }>Today</Button>
      </div>
    </div>
  )
}
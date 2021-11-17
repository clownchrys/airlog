import { ICalendarInfo } from "tui-calendar";
import { ScheduleCalendarEntity } from "src/models/ScheduleCalendarEntity";

export default class ScheduleCalendarEntityAdapter {
  public static toICalendarInfo(calendar: ScheduleCalendarEntity): ICalendarInfo {
    const { id, name, color, bgColor, dragBgColor, borderColor } = calendar;
    return {
      id: id.toString(),
      name, color, bgColor, dragBgColor, borderColor
    }
  }
}
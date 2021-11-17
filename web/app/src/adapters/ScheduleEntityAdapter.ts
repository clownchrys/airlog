import { ISchedule } from "tui-calendar";
import { ScheduleEntity } from "src/models/ScheduleEntity";

export default class ScheduleEntityAdapter {
  public static toISchedule(entity: ScheduleEntity): ISchedule {
      const { id, title, start, end, isAllDay, location, state, calendar, artist, writer, updatedAt, createdAt } = entity;
      return {
        id: id.toString(),
        title: title,
        start: start,
        end: end,
        isAllDay: isAllDay,
        category: isAllDay ? "allday" : "time",
        location: location ?? undefined,
        state: state ?? undefined,
        calendarId: calendar.id.toString(),
        raw: {
          updatedAt, createdAt
        },
        artist,
        writer
      }
  }
}
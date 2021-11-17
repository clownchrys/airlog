import { ISchedule, TZDate } from "tui-calendar";
import { ScheduleEntityCreate, ScheduleEntityUpdate } from "src/models/ScheduleEntity";
import { isUndefined } from "lodash";

export default class IScheduleAdapter {
  public static toScheduleEntityCreate(schedule: ISchedule, writerEmail: string, artistId: number): ScheduleEntityCreate | undefined {
    const { title, start, end, isAllDay, state, location, calendarId } = schedule;

    if (title && start && end && !isUndefined(isAllDay) && calendarId) {
      return {
        title,
        start: (start as TZDate).toDate().toString(),
        end: (end as TZDate).toDate().toString(),
        isAllDay,
        state: state ?? null,
        location: location ?? null,
        calendarId: parseInt(calendarId),
        writerEmail,
        artistId,
      };
    } else {
      return undefined;
    }
  }

  public static toScheduleEntityUpdate(schedule: ISchedule, writerEmail: string): ScheduleEntityUpdate {
    const { title, start, end, isAllDay, location, state, calendarId } = schedule;
    const entity: ScheduleEntityUpdate = {};
    return {
      title,
      start: start ? (start as TZDate).toDate().toString() : undefined,
      end: end ? (end as TZDate).toDate().toString() : undefined,
      isAllDay,
      state: state ?? null,
      location: location ?? null,
      calendarId: calendarId ? parseInt(calendarId) : undefined,
      writerEmail,
    }
  }
}
import ScheduleEntity from "src/lib/typeorm/entity/Schedule.entity";

export type ScheduleEntityCreate =
  Omit<ScheduleEntity, "id" | "createdAt" | "updatedAt" | "calendar" | "writer" | "artist">
  & {
  writerEmail: string,
  calendarId: number,
  artistId: number
};

export type ScheduleEntityUpdate = Partial<Omit<ScheduleEntityCreate, "artistId">>;

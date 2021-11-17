import { ScheduleCalendarEntity } from "src/models/ScheduleCalendarEntity";
import { ArtistEntity } from "src/models/ArtistEntity";
import { UserEntity } from "src/models/UserEntity";

export interface ScheduleEntity {
  id: number
  title: string
  start: string
  end: string
  isAllDay: boolean
  state: string | null
  location: string | null
  calendar: ScheduleCalendarEntity
  writer: UserEntity
  artist: ArtistEntity
  createdAt: string
  updatedAt: string
}

export type ScheduleEntityCreate =
  Omit<ScheduleEntity, "id" | "createdAt" | "updatedAt" | "calendar" | "writer" | "artist">
  & {
    writerEmail: string,
    calendarId: number,
    artistId: number
  };

export type ScheduleEntityUpdate = Partial<Omit<ScheduleEntityCreate, "artistId">>
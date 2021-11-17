import { ScheduleEntity } from "src/models/ScheduleEntity";
import { UserEntity } from "src/models/UserEntity";

export interface ScheduleReplyEntity {
  id: number
  content: string
  schedule: ScheduleEntity
  writer: UserEntity
  createdAt: string
  updatedAt: string
}

export type ScheduleReplyEntityCreate = Omit<ScheduleReplyEntity, "schedule" | "writer" | "id" | "createdAt" | "updatedAt"> & {
  scheduleId: number,
  writerEmail: string
}
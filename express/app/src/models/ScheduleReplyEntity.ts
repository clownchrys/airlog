import ScheduleReplyEntity from "src/lib/typeorm/entity/ScheduleReply.entity";

export type ScheduleReplyEntityCreate = Omit<ScheduleReplyEntity, "schedule" | "writer" | "id" | "createdAt" | "updatedAt"> & {
  scheduleId: number,
  writerEmail: string
}
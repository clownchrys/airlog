import { ScheduleEntity } from "src/models/ScheduleEntity";

declare module "tui-calendar" {
  export interface ISchedule extends Partial<Pick<ScheduleEntity, "artist" | "writer" | "updatedAt" | "createdAt">> {}
}
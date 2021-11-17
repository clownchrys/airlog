import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity({ name: "schedules_calendar" })
export default class ScheduleCalendarEntity {
  @PrimaryGeneratedColumn("increment", { name: "id" })
  id: number

  @Column({ name: "name", type: "varchar" })
  name: string

  @Column({ name: "color", type: "varchar", length: 9 })
  color: string

  @Column({ name: "bg_color", type: "varchar", length: 9 })
  bgColor: string

  @Column({ name: "drag_bg_color", type: "varchar", length: 9 })
  dragBgColor: string

  @Column({ name: "border_color", type: "varchar", length: 9 })
  borderColor: string
}

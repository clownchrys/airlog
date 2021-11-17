import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from "typeorm";
import UserEntity from "src/lib/typeorm/entity/User.entity";
import ScheduleEntity from "src/lib/typeorm/entity/Schedule.entity";

@Entity({ name: "schedules_reply" })
export default class ScheduleReplyEntity {
  @PrimaryGeneratedColumn("increment", { name: "id" })
  id: number

  @Column({ name: "content", type: "longtext" })
  content: string

  @ManyToOne(() => ScheduleEntity, (schedule) => schedule.id, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  @JoinColumn({ name: "schedule_id" })
  schedule: number

  @ManyToOne(() => UserEntity, (user) => user.email, { onUpdate: "CASCADE", onDelete: "NO ACTION" })
  @JoinColumn({ name: "writer_email", referencedColumnName: "email" })
  writer: string

  @Column({ name: "created_at", type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP" })
  createdAt: string

  @Column({
    name: "updated_at",
    type: "timestamp",
    precision: 6,
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP"
  })
  updatedAt: string
}

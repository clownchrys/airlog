import { PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from "typeorm";
import ScheduleEntity from "src/lib/typeorm/entity/Schedule.entity";
import UserEntity from "src/lib/typeorm/entity/User.entity";

@Entity({ name: "schedules_like" })
export default class ScheduleLikeEntity {
  @PrimaryGeneratedColumn("increment", { name: "id" })
  id: number

  @ManyToOne(() => ScheduleEntity, (schedule) => schedule.id)
  @JoinColumn({ name: "schedule_id" })
  schedule: number

  @ManyToOne(() => UserEntity, (user) => user.email)
  @JoinColumn({ name: "user_email", referencedColumnName: "email" })
  user: string
}
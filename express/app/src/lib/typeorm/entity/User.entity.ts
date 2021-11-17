import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import transformer from "src/lib/typeorm/transformer";
import ScheduleEntity from "src/lib/typeorm/entity/Schedule.entity";

@Entity({ name: "users" })
export default class UserEntity {
  @PrimaryGeneratedColumn("increment", { name: "id" })
  id: number

  @Column({ name: "name", type: "varchar", length: 255, nullable: true })
  name: string

  @Index({ unique: true })
  @Column({ name: "email", type: "varchar", length: 255, nullable: true })
  email: string

  @Column({ name: "email_verified", type: "timestamp", transformer: transformer.date, nullable: true })
  emailVerified: string

  @Column({ name: "image", type: "varchar", length: 255, nullable: true })
  image: string

  @Column({
    name: "created_at",
    type: "timestamp",
    precision: 6,
    transformer: transformer.date,
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: string

  @Column({
    name: "updated_at",
    type: "timestamp",
    precision: 6,
    transformer: transformer.date,
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP"
  })
  updatedAt: string
}

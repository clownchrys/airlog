import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import transformer from "src/lib/typeorm/transformer";

@Entity({ name: "sessions" })
export default class SessionEntity {
  @PrimaryGeneratedColumn("increment", { name: "id" })
  id!: number

  @Column({ name: "user_id", type: "int", nullable: false })
  userId!: number

  @Column({
    name: "expires",
    type: "timestamp",
    precision: 6,
    transformer: transformer.date,
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP"
  })
  expires!: string

  @Index({ unique: true })
  @Column({ name: "session_token", type: "varchar", length: 255, nullable: false })
  sessionToken!: string

  @Index({ unique: true })
  @Column({ name: "access_token", type: "varchar", length: 255, nullable: false })
  accessToken!: string

  @Column({
    name: "created_at",
    type: "timestamp",
    precision: 6,
    transformer: transformer.date,
    nullable: false,
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt!: string

  @Column({
    name: "updated_at",
    type: "timestamp",
    precision: 6,
    transformer: transformer.date,
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP"
  })
  updatedAt!: string
}

import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import transformer from "src/lib/typeorm/transformer";

@Entity({ name: "verification_requests" })
export default class VerificationRequestEntity {
  @PrimaryGeneratedColumn("increment", { name: "id" })
  id!: number

  @Column({ name: "identifier", type: "varchar", length: 255, nullable: false })
  identifier!: string

  @Index({ unique: true })
  @Column({ name: "token", type: "varchar", length: 255, nullable: false })
  token!: string

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

  @Column({
    name: "created_at",
    type: "timestamp",
    precision: 6,
    transformer: transformer.date,
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
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

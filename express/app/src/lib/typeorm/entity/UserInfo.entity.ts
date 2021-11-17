import { Column, Entity, Index } from "typeorm";
import transformer from "src/lib/typeorm/transformer";

@Entity({ name: "users_info" })
export default class UserInfoEntity {
  @Index({ unique: true })
  @Column({ name: "user_id", type: "integer", primary: true }) // FK
  userId!: number

  @Column({ name: "nick_name", type: "varchar" })
  nickName!: string

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

import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import transformer from "src/lib/typeorm/transformer";

@Entity({ name: "accounts" })
export default class AccountEntity {
  @PrimaryGeneratedColumn("increment", { name: "id" })
  id!: number

  @Index({ unique: true })
  @Column({ name: "compound_id", type: "varchar", length: 255, nullable: false })
  compoundId!: string

  @Index()
  @Column({ name: "user_id", type: "int", nullable: false })
  userId!: number

  @Column({ name: "provider_type", type: "varchar", length: 255, nullable: false })
  providerType!: string

  @Index()
  @Column({ name: "provider_id", type: "varchar", length: 255, nullable: false })
  providerId!: string

  @Index()
  @Column({ name: "provider_account_id", type: "varchar", length: 255, nullable: false })
  providerAccountId!: string

  @Column({ name: "refresh_token", type: "text", nullable: true })
  refreshToken!: string

  @Column({ name: "access_token", type: "text", nullable: true })
  accessToken!: string

  @Column({ name: "access_token_expires", type: "timestamp", transformer: transformer.date, nullable: true })
  accessTokenExpires!: string

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

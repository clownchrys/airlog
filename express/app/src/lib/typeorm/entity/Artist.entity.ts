import { Column, PrimaryGeneratedColumn, Entity, OneToMany, JoinColumn } from "typeorm";
import ArtistFollowerEntity from "src/lib/typeorm/entity/ArtistFollower.entity";

@Entity({ name: "artists" })
export default class ArtistEntity {
  @PrimaryGeneratedColumn("increment", { name: "id" })
  id: number

  @Column({ name: "name", type: "varchar", nullable: false })
  name: string

  @Column({ name: "bg_image", type: "varchar", nullable: false })
  bgImage: string

  @OneToMany(() => ArtistFollowerEntity, (artistFollower) => artistFollower.artist)
  @JoinColumn({ name: "follower_list", referencedColumnName: "artist" })
  followerList: ArtistFollowerEntity[]

  @Column({ name: "created_at", type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP" })
  createdAt: string

  @Column({
    name: "updated_at",
    type: "timestamp",
    precision: 6,
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: string
}

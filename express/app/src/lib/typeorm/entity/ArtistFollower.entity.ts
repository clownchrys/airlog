import { PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn, Column } from "typeorm";
import ArtistEntity from "src/lib/typeorm/entity/Artist.entity";
import UserEntity from "src/lib/typeorm/entity/User.entity";

@Entity({ name: "artists_follower" })
export default class ArtistFollowerEntity {
  @PrimaryGeneratedColumn("increment", { name: "id" })
  id: number

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  @JoinColumn({ name: "artist_id" })
  artist: number | ArtistEntity

  @ManyToOne(() => UserEntity, (user) => user.email, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  @JoinColumn({ name: "user_email", referencedColumnName: "email" })
  user: string | UserEntity

  @Column({ name: "created_at", type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP" })
  createdAt: string
}

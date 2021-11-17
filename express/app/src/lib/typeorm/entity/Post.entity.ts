import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import UserEntity from "src/lib/typeorm/entity/User.entity";
import ArtistEntity from "src/lib/typeorm/entity/Artist.entity";
import PostReplyEntity from "src/lib/typeorm/entity/PostReply.entity";
import PostLikeEntity from "src/lib/typeorm/entity/PostLike.entity";

@Entity({ name: "posts" })
export default class PostEntity {
  @PrimaryGeneratedColumn("increment", { name: "id" })
  id: number

  @Column({ name: "title", type: "varchar" })
  title: string

  @Column({ name: "content", type: "longtext" })
  content: string

  @ManyToOne(() => UserEntity, (user) => user.email)
  @JoinColumn({ name: "writer_email", referencedColumnName: "email" })
  writer: string

  @ManyToOne(() => ArtistEntity, (artist) => artist.id)
  @JoinColumn({ name: "artist_id" })
  artist: number

  @OneToMany(() => PostReplyEntity, (postReply) => postReply.post)
  @JoinColumn({ name: "reply_list", referencedColumnName: "post" })
  replyList: PostReplyEntity[]

  @OneToMany(() => PostLikeEntity, (postLike) => postLike.post)
  @JoinColumn({ name: "like_list", referencedColumnName: "post" })
  likeList: PostLikeEntity[]

  @Column({ name: "view_count", type: "int", default: 0 })
  viewCount: number

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

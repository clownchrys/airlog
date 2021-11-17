import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from "typeorm";
import PostEntity from "src/lib/typeorm/entity/Post.entity";
import UserEntity from "src/lib/typeorm/entity/User.entity";

@Entity({ name: "posts_reply" })
export default class PostReplyEntity {
  @PrimaryGeneratedColumn("increment", { name: "id" })
  id: number

  @Column({ name: "content", type: "longtext" })
  content: string

  @ManyToOne(() => PostEntity, (post) => post.id, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  @JoinColumn({ name: "post_id" })
  post: number | PostEntity

  @ManyToOne(() => UserEntity, (user) => user.email)
  @JoinColumn({ name: "writer_email", referencedColumnName: "email" })
  writer: string | UserEntity

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

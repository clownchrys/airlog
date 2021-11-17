import { PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from "typeorm";
import PostEntity from "src/lib/typeorm/entity/Post.entity";
import UserEntity from "src/lib/typeorm/entity/User.entity";

@Entity({ name: "posts_like" })
export default class PostLikeEntity {
  @PrimaryGeneratedColumn("increment", { name: "id" })
  id: number

  @ManyToOne(() => PostEntity, (post) => post.id, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  @JoinColumn({ name: "post_id" })
  post: number | PostEntity

  @ManyToOne(() => UserEntity, (user) => user.email)
  @JoinColumn({ name: "user_email", referencedColumnName: "email" })
  user: string | UserEntity
}
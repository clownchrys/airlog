import { PostEntity } from "src/models/PostEntity";
import { UserEntity } from "src/models/UserEntity";

export interface PostLikeEntity {
  id: number
  post: number | PostEntity
  user: string | UserEntity
}

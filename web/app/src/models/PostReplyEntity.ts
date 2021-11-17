import { UserEntity } from "src/models/UserEntity";
import { PostEntity } from "src/models/PostEntity";

export interface PostReplyEntity {
  id: number
  content: string
  post: number | PostEntity
  writer: string | UserEntity
  createdAt: string
  updatedAt: string
}

export type PostReplyEntityCreate = Pick<PostReplyEntity, "content"> & {
  postId: number
  writerEmail: string
}
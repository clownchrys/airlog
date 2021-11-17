import { UserEntity } from "src/models/UserEntity";
import { ArtistEntity } from "src/models/ArtistEntity";
import { PostReplyEntity } from "src/models/PostReplyEntity";
import { PostLikeEntity } from "src/models/PostLikeEntity";

export interface PostEntity {
  id: number
  title: string
  content: string
  writer: UserEntity
  artist: ArtistEntity
  replyList: PostReplyEntity[]
  likeList: PostLikeEntity[]
  viewCount: number
  createdAt: string
  updatedAt: string
}

export type PostEntityCreate = Omit<PostEntity, "id" | "createdAt" | "updatedAt" | "writer" | "artist" | "replyList" | "likeList" | "viewCount"> & {
  writerEmail: string
  artistId: number
}

export type PostEntityUpdate = Pick<PostEntity, "title" | "content">

import { ArtistFollowerEntity } from "src/models/ArtistFollowerEnityt";

export interface ArtistEntity {
  id: number
  name: string
  bgImage: string
  followerList: ArtistFollowerEntity[]
  createdAt: string
  updatedAt: string
}

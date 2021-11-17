import { UserEntity } from "src/models/UserEntity";
import { ArtistEntity } from "src/models/ArtistEntity";

export interface ArtistFollowerEntity {
  id: number
  artist: number | ArtistEntity
  user: string | UserEntity
  createdAt: string
}

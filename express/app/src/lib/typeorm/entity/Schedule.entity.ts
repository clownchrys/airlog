import { Column, JoinColumn, PrimaryGeneratedColumn, Entity, ManyToOne, RelationId } from "typeorm";
import UserEntity from "src/lib/typeorm/entity/User.entity";
import ArtistEntity from "src/lib/typeorm/entity/Artist.entity";
import ScheduleCalendarEntity from "src/lib/typeorm/entity/ScheduleCalendar.entity";

@Entity({ name: "schedules" })
export default class ScheduleEntity {
  @PrimaryGeneratedColumn("increment", { name: "id" })
  id: number

  @Column({ name: "title", type: "text" })
  title: string

  @Column({ name: "start", type: "timestamp" })
  start: string

  @Column({ name: "end", type: "timestamp" })
  end: string

  @Column({ name: "is_all_day", type: "boolean" })
  isAllDay: boolean

  @Column({ name: "state", type: "varchar", nullable: true })
  state: string | null

  @Column({ name: "location", type: "varchar", nullable: true })
  location: string | null

  @ManyToOne(() => UserEntity, (user) => user.email, { onUpdate: "CASCADE", onDelete: "NO ACTION" })
  @JoinColumn({ name: "writer_email", referencedColumnName: "email" })
  writer: string

  @ManyToOne(() => ScheduleCalendarEntity, (calendar) => calendar.id, { onUpdate: "CASCADE", onDelete: "NO ACTION" })
  @JoinColumn({ name: "calendar_id" })
  calendar: number

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, { onUpdate: "CASCADE", onDelete: "NO ACTION" })
  @JoinColumn({ name: "artist_id" })
  artist: number

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

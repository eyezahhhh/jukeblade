import { ApiProperty } from "@nestjs/swagger";
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Track } from "./track.entity";

@Entity("discs")
export class Disc {
	@PrimaryGeneratedColumn("uuid")
	@ApiProperty({
		type: String,
	})
	uuid: string;

	@Column({
		unique: true,
		type: "int",
		nullable: true,
	})
	@ApiProperty({
		type: "integer",
		nullable: true,
	})
	position: number | null;

	@ApiProperty({
		type: Date,
	})
	@CreateDateColumn()
	dateCreated: Date;

	@Column({
		type: "text",
		length: 300,
	})
	@ApiProperty({
		type: String,
	})
	artist: string;

	@Column({
		type: "text",
		length: 500,
	})
	@ApiProperty({
		type: String,
	})
	album: string;

	@OneToMany(() => Track, (track) => track.disc, {
		eager: true,
	})
	@ApiProperty({
		type: () => [Track],
	})
	tracks: Track[];
}

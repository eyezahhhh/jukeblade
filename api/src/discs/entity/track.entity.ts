import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Disc } from "./disc.entity";

@Entity("tracks")
export class Track {
	@PrimaryGeneratedColumn("uuid")
	@ApiProperty({
		type: String,
	})
	uuid: string;

	@Column({
		type: "int",
	})
	@ApiProperty({
		type: "integer",
	})
	index: number;

	@Column({
		type: "text",
		length: 500,
	})
	@ApiProperty({
		type: String,
	})
	title: string;

	@ManyToOne(() => Disc, (disc) => disc.tracks, {
		eager: false,
	})
	@ApiPropertyOptional({
		type: () => Disc,
	})
	disc: Disc;
}

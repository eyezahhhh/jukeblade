import { ApiProperty } from "@nestjs/swagger";
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

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
}

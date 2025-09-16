import { ApiProperty } from "@nestjs/swagger";
import {
	IsInt,
	IsNotEmpty,
	IsString,
	Max,
	MaxLength,
	Min,
} from "class-validator";

export class AddTrackDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(500)
	@ApiProperty({
		type: String,
	})
	title: string;

	@IsInt()
	@Min(1)
	@Max(99)
	@ApiProperty({
		type: "integer",
	})
	index: number;
}

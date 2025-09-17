import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
	IsArray,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	Max,
	MaxLength,
	Min,
} from "class-validator";

export class CreateDiscDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(300)
	@ApiProperty({
		type: String,
	})
	artist: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(500)
	@ApiProperty({
		type: String,
	})
	album: string;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(200)
	@ApiPropertyOptional({
		type: "integer",
	})
	position?: number;

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	@ApiPropertyOptional({
		type: [String],
	})
	tracks?: string[];
}

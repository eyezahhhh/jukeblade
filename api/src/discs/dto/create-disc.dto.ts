import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
	IsInt,
	IsOptional,
	IsString,
	Max,
	MaxLength,
	Min,
	MinLength,
} from "class-validator";

export class CreateDiscDto {
	@IsString()
	@MinLength(1)
	@MaxLength(300)
	@ApiProperty({
		type: String,
	})
	artist: string;

	@IsString()
	@MinLength(1)
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
}

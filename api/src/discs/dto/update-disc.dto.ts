import { ApiPropertyOptional } from "@nestjs/swagger";
import {
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	Max,
	MaxLength,
	Min,
} from "class-validator";

export class UpdateDiscDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MaxLength(300)
	@ApiPropertyOptional({
		type: String,
	})
	artist?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MaxLength(500)
	@ApiPropertyOptional({
		type: String,
	})
	album?: string;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(200)
	@ApiPropertyOptional({
		type: "integer",
		nullable: true,
	})
	position?: number | null;
}

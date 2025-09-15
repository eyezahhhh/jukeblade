import { ApiPropertyOptional } from "@nestjs/swagger";
import {
	IsInt,
	IsOptional,
	IsString,
	IsUUID,
	Max,
	MaxLength,
	Min,
	MinLength,
} from "class-validator";

export class UpdateDiscDto {
	@IsOptional()
	@IsString()
	@MinLength(1)
	@MaxLength(300)
	@ApiPropertyOptional({
		type: String,
	})
	artist?: string;

	@IsOptional()
	@IsString()
	@MinLength(1)
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
	})
	position?: number;
}

import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class PlayDiscDto {
	@IsOptional()
	@IsUUID(4)
	@ApiPropertyOptional({
		type: String,
	})
	trackUuid?: string;
}

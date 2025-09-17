import { ApiProperty } from "@nestjs/swagger";

export class SearchReleaseTrack {
	@ApiProperty({
		type: "integer",
	})
	position: number;

	@ApiProperty({
		type: String,
	})
	title: string;

	@ApiProperty({
		type: "integer",
	})
	duration: number;
}

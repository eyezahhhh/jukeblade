import { ApiProperty } from "@nestjs/swagger";
import { SearchReleaseMedia } from "./search-release-media.type";

export class SearchRelease {
	@ApiProperty({
		type: String,
	})
	id: string;

	@ApiProperty({
		type: String,
	})
	artist: string;

	@ApiProperty({
		type: String,
	})
	title: string;

	@ApiProperty({
		nullable: true,
		type: String,
	})
	albumCover: string | null;

	@ApiProperty({
		type: [SearchReleaseMedia],
	})
	media: SearchReleaseMedia[];
}

import { Controller } from "@nestjs/common";
import { SearchService } from "./search.service";
import { Get } from "@nestjs/common";
import { Param } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { SearchRelease } from "./type/search-release.type";

@Controller("search")
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	@Get(":query")
	@ApiOkResponse({
		type: [SearchRelease],
	})
	search(@Param("query") query: string) {
		return this.searchService.search(query);
	}
}

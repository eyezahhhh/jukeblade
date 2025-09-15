import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LircService } from "./lirc.service";
import { ApiNoContentResponse } from "@nestjs/swagger";
import { IrCodeDto } from "./enum/dto/ir-code.dto";

@Controller("ir")
export class LircController {
	constructor(private readonly lircService: LircService) {}

	@Post()
	@ApiNoContentResponse()
	@HttpCode(HttpStatus.NO_CONTENT)
	send(@Body() dto: IrCodeDto) {
		this.lircService.send([dto.code]);
	}
}

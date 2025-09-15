import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Put,
} from "@nestjs/common";
import { DiscsService } from "./discs.service";
import { ApiNoContentResponse, ApiOkResponse } from "@nestjs/swagger";
import { Disc } from "./entity/disc.entity";
import { CreateDiscDto } from "./dto/create-disc.dto";
import { UpdateDiscDto } from "./dto/update-disc.dto";

@Controller("discs")
export class DiscsController {
	constructor(private readonly discsService: DiscsService) {}

	@Get("inserted")
	@ApiOkResponse({
		type: [Disc],
	})
	async getInsertedDiscs() {
		return this.discsService.findAllInserted();
	}

	@Get("uninserted")
	@ApiOkResponse({
		type: [Disc],
	})
	async getUninsertedDiscs() {
		return this.discsService.findAllUninserted();
	}

	@Put()
	@ApiOkResponse({
		type: Disc,
	})
	createDisc(@Body() dto: CreateDiscDto) {
		return this.discsService.create(dto);
	}

	@Get(":uuid")
	@ApiOkResponse({
		type: Disc,
	})
	getDisc(@Param("uuid") uuid: string) {
		return this.discsService.findByUuid(uuid);
	}

	@Patch(":uuid")
	@ApiOkResponse({
		type: Disc,
	})
	updateDisc(@Param("uuid") uuid: string, @Body() dto: UpdateDiscDto) {
		return this.discsService.update(uuid, dto);
	}

	@Delete(":uuid")
	@ApiNoContentResponse()
	deleteDisc(@Param("uuid") uuid: string) {
		return this.discsService.delete(uuid);
	}

	@Post(":uuid/play")
	@ApiNoContentResponse()
	async playDisc(@Param("uuid") uuid: string) {
		const disc = await this.discsService.findByUuid(uuid);
		this.discsService.play(disc);
	}
}

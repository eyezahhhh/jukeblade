import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { IsNull, Not, Repository } from "typeorm";
import { Disc } from "./entity/disc.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateDiscDto } from "./dto/create-disc.dto";
import { UpdateDiscDto } from "./dto/update-disc.dto";
import { LircService } from "src/lirc/lirc.service";
import IrCode from "src/lirc/enum/ir-code.enum";
import { AddTrackDto } from "./dto/add-track.dto";
import { Track } from "./entity/track.entity";

@Injectable()
export class DiscsService {
	constructor(
		@InjectRepository(Disc)
		private readonly discsRepository: Repository<Disc>,
		@InjectRepository(Track)
		private readonly tracksRepository: Repository<Track>,
		private readonly lircService: LircService,
	) {}

	findAllInserted() {
		return this.discsRepository.find({
			where: {
				position: Not(IsNull()),
			},
			order: {
				position: "ASC",
			},
		});
	}

	findAllUninserted() {
		return this.discsRepository.find({
			where: {
				position: IsNull(),
			},
		});
	}

	findAtPosition(position: number) {
		return this.discsRepository.findOneBy({
			position,
		});
	}

	async findByUuid(uuid: string) {
		const disc = await this.discsRepository.findOneBy({
			uuid,
		});
		if (!disc) {
			throw new NotFoundException("Disc not found");
		}
		return disc;
	}

	async create(dto: CreateDiscDto) {
		if (dto.position) {
			if (await this.findAtPosition(dto.position)) {
				throw new ConflictException("Disc already exists at position");
			}
		}

		const disc = this.discsRepository.create({
			artist: dto.artist,
			album: dto.album,
			position: dto.position || null,
		});
		await this.discsRepository.insert(disc);
		return disc;
	}

	async update(uuid: string, dto: UpdateDiscDto) {
		const disc = await this.findByUuid(uuid);
		if (!disc) {
			throw new NotFoundException("Disc not found");
		}
		if (dto.position) {
			const existing = await this.findAtPosition(dto.position);
			if (existing && existing.uuid != disc.uuid) {
				throw new ConflictException("Disc already exists at position");
			}
		}
	}

	async delete(uuid: string) {
		const disc = await this.findByUuid(uuid);
		if (!disc) {
			throw new NotFoundException("Disc not found");
		}
		this.discsRepository.remove(disc);
	}

	getPlaySequence(disc: Disc) {
		if (!disc.position) {
			throw new BadRequestException("Disc isn't inserted");
		}
		const sequence = [IrCode.DISC];
		const chars = disc.position.toString().split("");
		for (let char of chars) {
			const code = {
				"1": IrCode.NUM_1,
				"2": IrCode.NUM_2,
				"3": IrCode.NUM_3,
				"4": IrCode.NUM_4,
				"5": IrCode.NUM_5,
				"6": IrCode.NUM_6,
				"7": IrCode.NUM_7,
				"8": IrCode.NUM_8,
				"9": IrCode.NUM_9,
				"0": IrCode.NUM_10_0,
			}[char];
			sequence.push(code);
		}
		sequence.push(IrCode.ENTER);
		return sequence;
	}

	play(disc: Disc) {
		const sequence = this.getPlaySequence(disc);
		console.log(sequence);
		this.lircService.send(sequence);
	}

	async addTrack(disc: Disc, dto: AddTrackDto) {
		disc = await this.findByUuid(disc.uuid);
		if (disc.tracks.some((track) => track.index == dto.index)) {
			throw new BadRequestException("Track already exists at index");
		}
		const track = this.tracksRepository.create({
			title: dto.title,
			index: dto.index,
			disc,
		});
		await this.tracksRepository.insert(track);
		disc.tracks.push(track);
		return disc;
	}

	async deleteTrack(track: Track) {
		const uuid = track.uuid;
		track = await this.tracksRepository.findOne({
			where: { uuid },
			relations: {
				disc: true,
			},
		});
		if (!track) {
			throw new NotFoundException("Track not found");
		}
		const disc = track.disc;
		await this.tracksRepository.remove(track);
		disc.tracks = disc.tracks.filter((track) => track.uuid != uuid);
		return disc;
	}
}

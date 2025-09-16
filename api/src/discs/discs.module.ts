import { Module } from "@nestjs/common";
import { DiscsService } from "./discs.service";
import { DiscsController } from "./discs.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Disc } from "./entity/disc.entity";
import { LircModule } from "src/lirc/lirc.module";
import { Track } from "./entity/track.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Disc, Track]), LircModule],
	controllers: [DiscsController],
	providers: [DiscsService],
})
export class DiscsModule {}

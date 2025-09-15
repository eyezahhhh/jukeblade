import { Module } from "@nestjs/common";
import { LircService } from "./lirc.service";
import { LircController } from "./lirc.controller";

@Module({
	controllers: [LircController],
	providers: [LircService],
	exports: [LircService],
})
export class LircModule {}

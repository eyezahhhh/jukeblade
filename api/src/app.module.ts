import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LircModule } from "./lirc/lirc.module";

@Module({
	imports: [LircModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LircModule } from "./lirc/lirc.module";
import { DiscsModule } from "./discs/discs.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "better-sqlite3",
			database: "database.sqlite",
			synchronize: true,
			entities: [__dirname + "/**/*.entity{.ts,.js}"],
		}),
		LircModule,
		DiscsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { readFileSync, writeFileSync } from "fs";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
		}),
	);

	app.enableCors();

	const packageJson = JSON.parse(readFileSync("package.json").toString());
	const version = packageJson.version as string;

	const config = new DocumentBuilder()
		.setTitle("Jukeblade API")
		.setVersion(version)
		.build();
	const document = SwaggerModule.createDocument(app, config);
	writeFileSync("../oas3-api.json", JSON.stringify(document, null, 2));

	const port = process.env.PORT ?? 3000;
	await app.listen(port);
	console.log(`Listening on *:${port}`);
}
bootstrap();

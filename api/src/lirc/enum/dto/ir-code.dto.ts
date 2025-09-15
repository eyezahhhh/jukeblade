import { IsEnum } from "class-validator";
import IrCode from "../ir-code.enum";
import { ApiProperty } from "@nestjs/swagger";

export class IrCodeDto {
	@IsEnum(IrCode)
	@ApiProperty({
		enum: IrCode,
		enumName: "IrCode",
		"x-enumNames": Object.keys(IrCode),
	})
	code: IrCode;
}

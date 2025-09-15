import { IrCode } from "./api-schema";

export function getIrCodeName(code: IrCode) {
	const entry = Object.entries(IrCode).find(
		([_, scancode]) => scancode == code,
	);
	return entry?.[0] || null;
}

export function cc(...classes: (string | false | null | undefined)[]) {
	return classes.filter((className) => !!className).join(" ");
}

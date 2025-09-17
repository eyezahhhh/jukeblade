import IrCode from "./lirc/enum/ir-code.enum";

export function switchRecord<
	A extends string | number | symbol,
	B extends string | number | symbol,
>(record: Record<A, B>): Record<B, A> {
	return Object.fromEntries(
		Object.entries(record).map(([key, value]) => [value, key]),
	);
}

export function getDigitIrCode(digit: number | string) {
	switch (digit.toString()) {
		case "0":
			return IrCode.NUM_10_0;
		case "1":
			return IrCode.NUM_1;
		case "2":
			return IrCode.NUM_2;
		case "3":
			return IrCode.NUM_3;
		case "4":
			return IrCode.NUM_4;
		case "5":
			return IrCode.NUM_5;
		case "6":
			return IrCode.NUM_6;
		case "7":
			return IrCode.NUM_7;
		case "8":
			return IrCode.NUM_8;
		case "9":
			return IrCode.NUM_9;
	}
	throw new Error("Not a digit");
}

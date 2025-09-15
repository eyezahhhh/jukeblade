import { IrCode } from "../api-schema";

const IR_NAMES: Record<IrCode, [string, string | null]> = {
	[IrCode.POWER]: ["Power", null],
	[IrCode.CONTINUE]: ["Continue", null],
	[IrCode.SHUFFLE]: ["Shuffle", null],
	[IrCode.PROGRAM]: ["Program", null],
	[IrCode.DISC]: ["Disc", "Caps"],
	[IrCode.GROUP]: ["Group", "Disc"],
	[IrCode.TIME_TEXT]: ["Time/Text", "Del"],
	[IrCode.NUM_1]: ["1", "&!?"],
	[IrCode.NUM_2]: ["2", "ABC"],
	[IrCode.NUM_3]: ["3", "DEF"],
	[IrCode.NUM_4]: ["4", "GHI"],
	[IrCode.NUM_5]: ["5", "JKL"],
	[IrCode.NUM_6]: ["6", "MNO"],
	[IrCode.NUM_7]: ["7", "PRS"],
	[IrCode.NUM_8]: ["8", "TUV"],
	[IrCode.NUM_9]: ["9", "WXY"],
	[IrCode.GREATER_10]: [">10", null],
	[IrCode.NUM_10_0]: ["10/0", "QZ"],
	[IrCode.ENTER]: ["Enter", null],
	[IrCode.REPEAT]: ["Repeat", null],
	[IrCode.CHECK]: ["Check", null],
	[IrCode.CLEAR]: ["Clear", null],
	[IrCode.MEMO_INPUT]: ["Memo Input", null],
	[IrCode.MEMO_SCAN]: ["Memo Scan", null],
	[IrCode.HIGHLIGHT]: ["Highlight", null],
	[IrCode.PLAY]: ["▶", null],
	[IrCode.PAUSE]: ["⏸", null],
	[IrCode.STOP]: ["⏹", null],
	[IrCode.AMS_BACK]: ["⏮", null],
	[IrCode.AMS_FORWARD]: ["⏭", null],
	[IrCode.AMS_REWIND]: ["⏪", null],
	[IrCode.AMS_FASTFORWARD]: ["⏩", null],
	[IrCode.DISC_SKIP_BACK]: ["-", null],
	[IrCode.DISC_SKIP_FORWARD]: ["+", null],
};

export function getIrCodeName(code: IrCode) {
	const [name, memoInputName] = IR_NAMES[code];
	return {
		name,
		memoInputName,
	};
}

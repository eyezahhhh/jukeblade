import { IrCode } from "../../api-schema";
import RemoteButton from "../remote-button";
import styles from "./remote.module.scss";

export function Remote() {
	return (
		<div className={styles.container}>
			{LAYOUT.map((row, index) => (
				<div className={styles.row} key={index}>
					{row.map((code) => (
						<RemoteButton key={code} code={code} />
					))}
				</div>
			))}
		</div>
	);
}

const LAYOUT: IrCode[][] = [
	[IrCode.POWER],
	[IrCode.CONTINUE, IrCode.SHUFFLE, IrCode.PROGRAM],
	[IrCode.DISC, IrCode.GROUP, IrCode.TIME_TEXT],
	[IrCode.NUM_1, IrCode.NUM_2, IrCode.NUM_3],
	[IrCode.NUM_4, IrCode.NUM_5, IrCode.NUM_6],
	[IrCode.NUM_7, IrCode.NUM_8, IrCode.NUM_9],
	[IrCode.GREATER_10, IrCode.NUM_10_0, IrCode.ENTER],
	[IrCode.REPEAT, IrCode.CHECK, IrCode.CLEAR],
	[IrCode.MEMO_INPUT, IrCode.MEMO_SCAN, IrCode.HIGHLIGHT],
	[IrCode.PLAY],
	[IrCode.PAUSE, IrCode.STOP],
	[IrCode.AMS_BACK, IrCode.AMS_FORWARD],
	[IrCode.AMS_REWIND, IrCode.AMS_FASTFORWARD],
	[IrCode.DISC_SKIP_BACK, IrCode.DISC_SKIP_FORWARD],
];

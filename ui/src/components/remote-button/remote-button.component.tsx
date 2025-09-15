import { useMemo, useState } from "react";
import type { IrCode } from "../../api-schema";
import { cc } from "../../utils/string.util";
import styles from "./remote-button.module.scss";
import Api from "../../api";
import { getIrCodeName } from "../../utils/ir-code.util";

interface Props {
	code: IrCode;
}

export function RemoteButton({ code }: Props) {
	const { name, memoInputName } = useMemo(() => getIrCodeName(code), [code]);
	const [isPressed, setIsPressed] = useState(false);

	return (
		<button
			className={cc(styles.container, isPressed && styles.pressed)}
			onClick={() => {
				if (isPressed) {
					return;
				}
				setIsPressed(true);
				Api.POST("/ir", {
					body: {
						code,
					},
				}).finally(() => {
					setIsPressed(false);
				});
			}}
		>
			{name}
		</button>
	);
}

import { useMemo, useState } from "react";
import type { IrCode } from "../../api-schema";
import { cc, getIrCodeName } from "../../utils";
import styles from "./remote-button.module.scss";
import Api from "../../api";

interface Props {
	code: IrCode;
}

export function RemoteButton({ code }: Props) {
	const name = useMemo(() => {
		return getIrCodeName(code) || "Unknown";
	}, [code]);
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

import type { ReactNode } from "react";
import styles from "./modal.module.scss";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
	children?: ReactNode;
	open: boolean;
	onClose?: () => void;
}

export function Modal({ children, open, onClose }: Props) {
	if (!open) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.background} onClick={() => onClose?.()} />
			<div className={styles.modal}>
				<button className={styles.close} onClick={() => onClose?.()}>
					<CloseIcon />
				</button>
				{children}
			</div>
		</div>
	);
}

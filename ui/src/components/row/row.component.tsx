import type { ReactNode } from "react";
import { cc } from "../../utils/string.util";
import styles from "./row.module.scss";

interface Props {
	children?: ReactNode;
	className?: string;
}

export function Row({ children, className }: Props) {
	return <div className={cc(styles.container, className)}>{children}</div>;
}

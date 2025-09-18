export function cc(...classes: (string | false | null | undefined)[]) {
	return classes.filter((className) => !!className).join(" ");
}

export function duration(ms: number) {
	let s = Math.floor(ms / 1000);
	ms -= s * 1000;
	const m = Math.floor(s / 60);
	s -= m * 60;
	return `${m}:${s.toString().padStart(2, "0")}`;
}

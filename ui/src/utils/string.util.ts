export function cc(...classes: (string | false | null | undefined)[]) {
	return classes.filter((className) => !!className).join(" ");
}

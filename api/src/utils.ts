export function switchRecord<
	A extends string | number | symbol,
	B extends string | number | symbol,
>(record: Record<A, B>): Record<B, A> {
	return Object.fromEntries(
		Object.entries(record).map(([key, value]) => [value, key]),
	);
}

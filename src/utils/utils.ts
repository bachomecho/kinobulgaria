export function modalTitle(title: string): number {
	const midLength = 11;
	const marginMid = 14;

	const dist = Math.abs(title.length - midLength);

	let result = 0;
	if (title.length >= midLength) {
		result = marginMid - dist / 2;
	} else {
		console.log("its true");
		result = marginMid + dist / 2;
	}

	return Math.ceil(result);
}

export function modalTitle(
	title: string,
	midLength: number, // this value is used as an anchor point
	marginMid: number // this value changes based on how far away title length is compared to midLength
): number {
	console.log("title: ", title, "length: ", title.length);
	let dist = title.length - midLength;
	if (dist < 0) {
		dist *= -1;
	}
	if (title.length >= midLength) {
		marginMid -= dist / 2;
	} else {
		console.log("its true");
		marginMid += dist / 2;
	}
	return Math.ceil(marginMid);
}

export function wikipediaUrlExists(title: string): Promise<boolean> {
	const website = fetch(
		`https://bg.wikipedia.org/wiki/${title.replace(" ", "_")}`
	)
		.then(() => true)
		.catch(() => false);
	return website;
}

export function movieInfoSpacing(movieInfo: Movie) {
	const referenceText = [...Object.values(movieInfo)];
	const longest = referenceText.reduce((a, b) => {
		a > b ? a : b;
	});

	console.log("longest", longest);
}

// export function movieInfoSpacing(
// 	referenceText: string,
// 	normalText: string
// ): string {
// 	const diff = referenceText.length - normalText.length;
// 	const splitNormalText = normalText.split(":");
// 	const paddedInfo = " ".repeat(diff) + splitNormalText.at(-1);
// 	return splitNormalText[0] + ":" + paddedInfo;
// }

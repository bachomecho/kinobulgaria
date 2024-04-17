import { movieInfoSpacing } from "./utils";

describe("movieInfoSpacing", () => {
	it("should pad the normal text with spaces to match the time text length", () => {
		const referenceText = "Времетраене: 120 минути";
		const normalText = "Премиера: 1988";
		const expected = "Премиера:          1988";
		const result = movieInfoSpacing(referenceText, normalText);
		expect(result).toEqual(expected);
	});
});

import { modalTitle } from "./utils";

describe("modalTitle", () => {
	it("should return the correct result when title length is greater than or equal to midLength", () => {
		expect(modalTitle("Крадецът на праскови")).toBe(10);
		expect(modalTitle("Момчето си отива")).toBe(12);
	});

	it("should return the correct result when title length is less than midLength", () => {
		expect(modalTitle("Двойникът")).toBe(15);
		expect(modalTitle("Любимец 13")).toBe(15);
	});
});

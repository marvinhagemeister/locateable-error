import { relativePaths, fromError } from "../utils";
import { isLocateable } from "../Locateable";

describe("relativePaths", () => {
  it("should make all paths in string relative", () => {
    const input = "asdsad " + process.cwd() + "/foo/bar:8080 asd ";
    expect(relativePaths(input)).toEqual("asdsad ./foo/bar:8080 asd ");
  });
});

describe("fromError", () => {
  it("should convert Error -> Locateable", () => {
    const err = fromError(new Error("Foo"));
    expect(isLocateable(err)).toEqual(true);
  });
});

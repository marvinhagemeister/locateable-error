import strip = require("strip-ansi");
import chalk from "chalk";
import { isSource, isLocation, isLocateable, formatLocateable } from "../index";

describe("isSource", () => {
  it("should be false", () => {
    expect(isSource(undefined)).toEqual(false);
    expect(isSource(null)).toEqual(false);
    expect(isSource([])).toEqual(false);
    expect(isSource({})).toEqual(false);
    expect(isSource({ body: "" })).toEqual(false);
    expect(isSource({ name: "" })).toEqual(false);
  });

  it("should be true", () => {
    expect(isSource({ body: "", name: "" })).toEqual(true);
  });
});

describe("isLocation", () => {
  it("should be false", () => {
    expect(isLocation(undefined)).toEqual(false);
    expect(isLocation(null)).toEqual(false);
    expect(isLocation([])).toEqual(false);
    expect(isLocation({})).toEqual(false);
    expect(isLocation({ line: 2 })).toEqual(false);
    expect(isLocation({ column: 2 })).toEqual(false);
  });

  it("should be true", () => {
    expect(isLocation({ line: 1, column: 2 })).toEqual(true);
  });
});

describe("isLocateable", () => {
  it("should be false", () => {
    expect(isLocateable(undefined)).toEqual(false);
    expect(isLocateable(null)).toEqual(false);
    expect(isLocateable([])).toEqual(false);
    expect(isLocateable({})).toEqual(false);
  });

  it("should be true", () => {
    expect(
      isLocateable({
        message: "",
        source: { body: "", name: "" },
        locations: [],
      }),
    ).toEqual(true);
  });
});

describe("formatLocateable", () => {
  it("should return message if no location", () => {
    const r = formatLocateable({
      locations: [],
      message: "fail",
      source: { body: "foo", name: "bar" },
    });

    expect(r).toEqual("fail");
  });

  it("should create code-frame", () => {
    const r = formatLocateable({
      locations: [{ column: 2, line: 1 }],
      message: "fail",
      source: { body: "foo asd\nasd ads\nasd", name: "bar" },
    });

    expect(strip(r)).toMatchSnapshot();
  });

  it("should create code-frame with range", () => {
    const r = formatLocateable({
      locations: [{ column: 2, line: 1 }, { line: 1, column: 5 }],
      message: "fail",
      source: { body: "foo asd\nasd ads\nasd", name: "bar" },
    });

    expect(strip(r)).toMatchSnapshot();
  });
});

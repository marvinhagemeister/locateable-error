import { codeFrameColumns, Options } from "@babel/code-frame";
import chalk from "chalk";

export interface Source {
  body: string;
  name: string;
}

export interface Location {
  line: number;
  column: number;
}

export interface Locateable {
  message: string;
  source: Source;
  inlineMessage?: string;
  locations: Location[];
}

/**
 * Check if variable is of type `Source`
 */
export function isSource(x: any): x is Source {
  return (
    x !== undefined &&
    x !== null &&
    typeof x.body === "string" &&
    typeof x.name === "string"
  );
}

/**
 * Check if variable is of type `Location`
 */
export function isLocation(x: any): x is Location {
  return (
    x !== undefined &&
    x !== null &&
    typeof x.line === "number" &&
    typeof x.column === "number"
  );
}

/**
 * Check if variable implements `Locateable` interface
 */
export function isLocateable(x: any): x is Locateable {
  return (
    x !== undefined &&
    x !== null &&
    isSource(x.source) &&
    x.message !== undefined &&
    Array.isArray(x.locations)
  );
}

export type SimpleOpts = Pick<Options, "linesAbove" | "linesBelow">;

/**
 * Build code-frame from obj that implements `Locateable` interface
 */
export function formatLocateable(
  err: Locateable,
  options: SimpleOpts = {},
): string {
  if (err.locations.length === 0) {
    return err.message;
  }

  const locs = { start: err.locations[0], end: err.locations[1] };
  return codeFrameColumns(err.source.body, locs, {
    highlightCode: chalk.supportsColor.hasBasic,
    message: err.inlineMessage || err.message,
    ...options,
  });
}

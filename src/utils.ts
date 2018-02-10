import * as fs from "fs";
import { Locateable } from "./Locateable";

/**
 * Replace absolute paths with relative one's to current process.cwd
 */
export function relativePaths(content: string) {
  return content.split(process.cwd()).join(".");
}

const APP_REG = /\((.*\/(?!node_modules\/).*):(\d*):(\d*)\)/g;

/**
 * Convert standard `Error` object to `Locateable` error.
 */
export function fromError(err: Error): Error & Locateable {
  const out: Error & Locateable = {
    ...err,
    message: err.message,
    locations: [],
    source: { name: "", body: "" },
  };

  const match = APP_REG.exec("" + err.stack);
  if (match !== null) {
    const file = match[1];
    out.source.name = file;

    try {
      out.locations.push({
        line: parseInt(match[2], 10),
        column: parseInt(match[3], 10),
      });

      out.source.body = fs.readFileSync(file, "utf8");
    } catch (err2) {
      return out;
    }
  }

  return out;
}

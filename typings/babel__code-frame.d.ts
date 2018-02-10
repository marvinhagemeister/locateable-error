declare module "@babel/code-frame" {
  export interface Location {
    line: number;
    column: number;
  }

  export interface LocationRange {
    start: Location;
    end?: Location;
  }

  export interface Options {
    highlightCode?: boolean;
    /** defaults to 2 */
    linesAbove?: number;
    /** defaults to 3 */
    linesBelow?: number;
    forceColor?: boolean;
    message?: string;
  }

  export function codeFrameColumns(
    rawLines: string,
    location: LocationRange,
    options: Options,
  ): string;
}

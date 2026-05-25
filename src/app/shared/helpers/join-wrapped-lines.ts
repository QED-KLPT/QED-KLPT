export function joinWrappedLines(lines: string[]): string[] {
  const result: string[] = [];

  for (const line of lines) {
    if (result.length === 0) {
      result.push(line);
    } else if (/[\.\!\?]\s*$/.test(result[result.length - 1])) {
      result.push(line);
    } else {
      result[result.length - 1] = result[result.length - 1] + ' ' + line;
    }
  }

  return result;
}

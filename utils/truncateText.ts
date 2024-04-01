// utils/truncateText.ts
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  } else {
    return (
      text.substring(0, maxLength / 2) +
      "..." +
      text.substring(text.length - maxLength / 2)
    );
  }
}

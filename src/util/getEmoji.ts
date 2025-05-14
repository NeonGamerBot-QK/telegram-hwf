export function getEmojiFromName(n: string): string {
  switch (n) {
    case "yellow":
      return "💛";
    case "blue":
      return "💙";
    case "green":
      return "💚";
    case "red":
      return "❤️";
  }
}

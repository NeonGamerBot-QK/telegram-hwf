import { getConstants } from "./read-constants";

// heu = high enegry unplesant
export function getEmojiFromName(n: string): string {
  switch (n) {
    case "hep":
      return "💛";
    case "leu":
      return "💙";
    case "lep":
      return "💚";
    case "heu":
      return "❤️";
    default: 
    return "?"
  }
}
const con = await getConstants()
const categories = new Set(...(con).allFeelings.map(d=>d.category))
export function findEmojiFromEmotion(emotion: string):string {
 if(categories.has(emotion)){
    return getEmojiFromName(emotion)
  }
  const emotionCat = con.allFeelings.find((d) => d.feeling === emotion.toLowerCase());
  if (!emotionCat) {
    return "?";
  }
  return getEmojiFromName(emotionCat.category);

}
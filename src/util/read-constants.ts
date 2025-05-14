import JSON5 from "json5";
export interface Constants {
  start_string: string;
  allFeelings: {
    feeling: string;
    category: string;
  }[];
}
export async function getConstants(): Promise<Constants> {
  const constants = JSON5.parse(
    await Bun.file(__dirname + "/constants.json5").text(),
  );
  return constants;
}

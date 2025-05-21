export async function massSend(
  bot: any,
  string: string,
  friends: string[],
): Promise<void> {
  let delayTime =
    friends.length > 10 ? 50 * friends.length : friends.length * 10;
  // use advancd math to calculate this
  const incrementValue = delayTime / friends.length;
  for (const friend of friends) {
    await bot.sendMessage(friend, string);
    await new Promise((resolve) => setTimeout(resolve, delayTime));
    delayTime += incrementValue;
    if (friends.length > 100) delayTime *= 1.00000001;
  }
}
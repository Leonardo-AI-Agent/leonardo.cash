export enum Tiers {
  Top1 = 'Top1',
  Top2 = 'Top2',
  Top3 = 'Top3',
  Top5 = 'Top5',
  Top10 = 'Top10',
  Top25 = 'Top25',
  Top50 = 'Top50',
  Top100 = 'Top100',
}

export const BoosterValues = {
  [Tiers.Top1]: 100n,
  [Tiers.Top2]: 80n,
  [Tiers.Top3]: 60n,
  [Tiers.Top5]: 40n,
  [Tiers.Top10]: 20n,
  [Tiers.Top25]: 10n,
  [Tiers.Top50]: 5n,
  [Tiers.Top100]: 2n,
} as {
  [tier in Tiers]: bigint;
};

export const getBoosterValue = (index: number) => {
  if (index > 100) {
    return 0n;
  } else if (index > 50) {
    return BoosterValues[Tiers.Top100];
  } else if (index > 25) {
    return BoosterValues[Tiers.Top50];
  } else if (index > 10) {
    return BoosterValues[Tiers.Top25];
  } else if (index > 5) {
    return BoosterValues[Tiers.Top10];
  } else if (index > 3) {
    return BoosterValues[Tiers.Top5];
  } else if (index > 2) {
    return BoosterValues[Tiers.Top3];
  }
  return BoosterValues[Tiers.Top1];
};
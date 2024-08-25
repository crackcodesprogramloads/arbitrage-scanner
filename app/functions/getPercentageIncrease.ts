export const getPercentageIncrease = (firstPrice: number, secondPrice: number) => {
  const smallestPrice = Math.min(firstPrice, secondPrice);
  const highestPrice = Math.max(firstPrice, secondPrice);

  const percentageIncrease = (((highestPrice - smallestPrice) / smallestPrice) * 100).toFixed(4);

  return percentageIncrease;
};

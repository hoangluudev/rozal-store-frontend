export const getDiscountPercentage = (price, comparePrice) => {
  let gSaleRate = 0;
  if (price !== comparePrice) {
    gSaleRate = parseFloat(
      ((comparePrice - price) / comparePrice) * 100
    ).toFixed(1);
  }
  return gSaleRate;
};

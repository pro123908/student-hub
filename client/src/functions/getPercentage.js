const getPercentage = (val1, val2) => {
  let result = ((val1 * 100) / val2).toFixed(2);

  if (isNaN(result)) {
    return 0;
  }
  return result;
};

export default getPercentage;

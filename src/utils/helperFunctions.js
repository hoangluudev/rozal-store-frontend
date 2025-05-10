export const isNotNull = (value) => {
  return value !== null || value !== undefined;
};
export const searchParamsToObject = (searchParams) => {
  const params = new URLSearchParams(searchParams.toString());
  const result = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
};
export const getRatingColor = (score) => {
  switch (score) {
    case 1:
      return "#b71c1c";
    case 2:
      return "#f57c00";
    case 3:
      return "#ffca28";
    case 4:
      return "#64dd17";
    case 5:
      return "green";
    default:
      return "gray";
  }
};

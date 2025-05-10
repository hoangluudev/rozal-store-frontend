export const formatDatetime = (dateTimeString) => {
  const utcDate = new Date(dateTimeString);
  const gmt7Date = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);
  const day = gmt7Date.getUTCDate().toString().padStart(2, "0");
  const month = (gmt7Date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = gmt7Date.getUTCFullYear();
  const hours = gmt7Date.getUTCHours().toString().padStart(2, "0");
  const minutes = gmt7Date.getUTCMinutes().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export const getShortedCharacter = (string) => {
  const words = string.split(" ");
  const firstChar = words[0][0];
  const lastChar = words[words.length - 1][0];
  if (words.length > 1) {
    return (firstChar + lastChar).toUpperCase();
  }
  return firstChar.toUpperCase();
};
export const convertToCurrency = (number) => {
  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  };
  const formated = new Intl.NumberFormat("vi-VN", config).format(number);
  return formated;
};
export const getDiscountPercenage = (discountedPrice, originalPrice) => {
  if (originalPrice === 0) return 0;
  let gSaleRate = parseFloat(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  ).toFixed(0);
  return `${gSaleRate}%`;
};
export const isEmptyObj = (obj) => {
  if (obj === null || obj === undefined) {
    return true;
  }
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }
  if (typeof obj === "object") {
    return Object.keys(obj).length === 0;
  }
  return false;
};
export const stripHtmlTags = (html) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};
export function numberShorteningFormat(number) {
  if (number >= 1e9) {
    return (number / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (number >= 1e6) {
    return (number / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (number >= 1e3) {
    return (number / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return number.toString();
}
export function formatRateScore(score) {
  return score.toFixed(1);
}
export function convertToShortLetter(string) {
  const words = string.split(" ");
  const firstChar = words[0][0];
  const lastChar = words[words.length - 1][0];
  if (words.length > 1) {
    return (firstChar + lastChar).toUpperCase();
  }
  return firstChar.toUpperCase();
}

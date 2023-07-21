import configs from "../config";

function filterByZip(zipcode, searchField) {
  return zipcode.includes(searchField);
}

export function getImgUrl(img) {
  let url = img?.data?.attributes?.url;
  return url ? `${configs.baseUrl}${url}` : "";
}

export function getImgPath(img) {
  let url = img?.attributes?.url;
  return url ? `${configs.baseUrl}${url}` : "";
}

export function transformImageUri(src) {
  return `${configs.baseUrl}${src}`;
}

export function getCityFromZip(zipcode) {
  return String(zipcode).slice(0, 3);
}

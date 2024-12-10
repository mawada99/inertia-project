export const lookupCodeIsValid = (data, code) => {
  const handeldData = data["listLookupEntriesDropdown"];
  return handeldData.some((i) => i.code === code);
};

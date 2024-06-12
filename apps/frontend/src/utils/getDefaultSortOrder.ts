export const getDefaultSortOrder = (
  columnName: string,
  urlParams: URLSearchParams
) => {
  if (
    !urlParams.get("orderDirection") ||
    columnName !== urlParams.get("orderBy")
  )
    return null;

  if (urlParams.get("orderDirection") === "asc") {
    return "ascend";
  } else {
    return "descend";
  }
};

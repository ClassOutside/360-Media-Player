const formatDate = (date) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString(undefined, options);
};

module.exports = {
  formatDate,
};

function parseActivityDate(date) {
  // return date object
  const dateReg = /X{4}-\d{2}-\d{2}/;
  let parsedDate;
  if (dateReg.test(date) === true) {
    parsedDate = new Date(date.replace('XXXX', (new Date()).getFullYear()));
  } else {
    parsedDate = new Date(date);
  }
  return parsedDate;
}

module.exports = parseActivityDate;
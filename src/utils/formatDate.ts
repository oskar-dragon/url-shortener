function formatDate(date: Date, format: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('en-GB', format).format(date);
}

export default formatDate;

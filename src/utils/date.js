import constants from '../constants'


/**
 * input: Date object
 * output: '2023-12-25'
 */
function toDateString(date) {
  return date.toISOString().substring(0, 10)
}

/**
 * output: '2023-12-25'
 */
function currentDate() {
  return toDateString(new Date())
}

/**
 * output: '2023-12-25T17:08:19.021410+01:00'
 */
function currentDateTime() {
  return new Date().toISOString()
}

/**
 * output: '2023-12-25T00:00:00.000Z'
 */
function currentStartOfDay() {
  let today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  return today.toISOString()
}

/**
 * input: '2023-12-25'
 * output: '2023-12-25T00:00:00.000Z'
 */
function dateStartOfDay(dateString) {
  let date = new Date(dateString)
  date.setUTCHours(0, 0, 0, 0)
  return date.toISOString()
}

/**
 * input: '2023-12-25'
 * output: '2023-12-25T23:59:59.999Z'
 */
function dateEndOfDay(dateString) {
  let date = new Date(dateString)
  date.setUTCHours(23, 59, 59, 999)
  return date.toISOString()
}

/**
 * @returns '2023-11-25' if today is '2023-12-25'
 */
function oneMonthAgoDate() {
  let date = new Date()
  date.setMonth(date.getMonth() - 1)
  return toDateString(date)
}

/**
 * input: '2023-12-25'
 * output: '12/25/2023'
 */
function prettyDate(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(navigator.language, {dateStyle: 'short'}).format(date)
}

/**
 * input: '2023-12-25T17:08:19.021410+01:00'
 * output: '12/25/2023, 8:19AM'
 */
function prettyDateTime(dateTimeString) {
  const date = new Date(dateTimeString)
  return new Intl.DateTimeFormat(navigator.language, {dateStyle: 'short', timeStyle: 'short'}).format(date)
}

/**
 * input: '2023-12-25T17:08:19.021410+01:00'
 * output: 'December 25, 2023, 8:19:02 CEST'
 */
function offDateTime(dateTimeString) {
  const date = new Date(dateTimeString)
  return new Intl.DateTimeFormat(navigator.language, {dateStyle: 'long', timeStyle: 'medium'}).format(date)
}

/**
 * https://johnresig.com/blog/javascript-pretty-date/
 * input: '2023-12-25T17:08:19.021410+01:00'
 * output: '5 hours ago', 'Yesterday', '2 days ago'...
 * changes: add short (replace 'days' with 'd', remove 'Yesterday') & shortest (remove 'ago'), extend days & weeks
 */
function prettyRelativeDateTime(dateTimeString, size = null) {
  const date = new Date(dateTimeString || '');
  const now = new Date();
  const diffSeconds = (now - date) / 1000;
  const dayDiff = Math.floor(diffSeconds / 86400);

  if (isNaN(dayDiff) || dayDiff < 0) return "just now";

  // Calculate months and years
  const monthsDiff = now.getMonth() - date.getMonth() + 
                     (now.getFullYear() - date.getFullYear()) * 12;
  const yearsDiff = now.getFullYear() - date.getFullYear();

  function shortest() {
    if (dayDiff === 0) {
      if (diffSeconds < 60) return "just now";
      if (diffSeconds < 120) return "1m";
      if (diffSeconds < 3600) return Math.floor(diffSeconds / 60) + "m";
      if (diffSeconds < 7200) return "1h";
      return Math.floor(diffSeconds / 3600) + "h";
    }
    if (dayDiff < 10) return dayDiff + "d";
    if (dayDiff < 30) return Math.floor(dayDiff / 7) + "w";
    if (monthsDiff < 12) return monthsDiff + "mo";
    return yearsDiff + "y";
  }

  function short() {
    if (dayDiff === 0) {
      if (diffSeconds < 60) return "just now";
      if (diffSeconds < 120) return "1m ago";
      if (diffSeconds < 3600) return Math.floor(diffSeconds / 60) + "m ago";
      if (diffSeconds < 7200) return "1h ago";
      return Math.floor(diffSeconds / 3600) + "h ago";
    }
    if (dayDiff < 10) return dayDiff + "d ago";
    if (dayDiff < 30) return Math.floor(dayDiff / 7) + "w ago";
    if (monthsDiff < 12) return monthsDiff + "mo ago";
    return yearsDiff + "y ago";
  }

  function full() {
    if (dayDiff === 0) {
      if (diffSeconds < 60) return "just now";
      if (diffSeconds < 120) return "1 minute ago";
      if (diffSeconds < 3600) return Math.floor(diffSeconds / 60) + " minutes ago";
      if (diffSeconds < 7200) return "1 hour ago";
      return Math.floor(diffSeconds / 3600) + " hours ago";
    }
    if (dayDiff === 1) return "Yesterday";
    if (dayDiff < 10) return dayDiff + " days ago";
    if (dayDiff < 30) return Math.floor(dayDiff / 7) + " weeks ago";
    if (monthsDiff < 12) return monthsDiff + (monthsDiff === 1 ? " month ago" : " months ago");
    return yearsDiff + (yearsDiff === 1 ? " year ago" : " years ago");
  }

  if (size === "shortest") return shortest();
  if (size === "short") return short();
  return full();
}

/**
 * input: '2023-12-25', '2023-12-31'
 * output: true if date (or today) is between start and end dates
 */
function isBetweenTwoDates(startDateString, endDateString, date=currentDateTime()) {
  const startDate = dateStartOfDay(startDateString)
  const endDate = dateEndOfDay(endDateString)
  return (startDate <= date) && (date <= endDate)
}

function dateType(dateString) {
  if (dateString) {
    if (dateString.match(constants.DATE_FULL_REGEX_MATCH)) {
      return 'DAY'
    } else {
      // YYYY-MM
      const matches = dateString.match(constants.DATE_YEAR_MONTH_REGEX_MATCH)
      if (matches) {
        return 'MONTH'
      // YYYY
      } else if (dateString.match(constants.DATE_YEAR_REGEX_MATCH)) {
        return 'YEAR'
      } else {
        return null
      }
    }
  }
  return null
}

export default {
  toDateString,
  currentDate,
  currentDateTime,
  currentStartOfDay,
  dateStartOfDay,
  dateEndOfDay,
  oneMonthAgoDate,
  prettyDate,
  prettyDateTime,
  offDateTime,
  prettyRelativeDateTime,
  isBetweenTwoDates,
  dateType,
}

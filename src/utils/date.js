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
function prettyRelativeDateTime(dateTimeString, size=null) {
  var date = new Date(dateTimeString || ''),
      diff = (((new Date()).getTime() - date.getTime()) / 1000),
      day_diff = Math.floor(diff / 86400)

  if (isNaN(day_diff) || day_diff < 0) return;

  if (size == 'shortest') {
    return day_diff == 0 && (
      diff < 60 && "just now" || diff < 120 && "1m" || diff < 3600 && Math.floor(diff / 60) + "m" || diff < 7200 && "1h" || diff < 86400 && Math.floor(diff / 3600) + "h") || day_diff < 10 && day_diff + "d" || Math.ceil(day_diff / 7) + "w";
  }
  if (size == 'short') {
    return day_diff == 0 && (
      diff < 60 && "just now" || diff < 120 && "1m ago" || diff < 3600 && Math.floor(diff / 60) + "m ago" || diff < 7200 && "1h ago" || diff < 86400 && Math.floor(diff / 3600) + "h ago") || day_diff < 10 && day_diff + "d ago" || Math.ceil(day_diff / 7) + "w ago";
  }
  return day_diff == 0 && (
  diff < 60 && "just now" || diff < 120 && "1 minute ago" || diff < 3600 && Math.floor(diff / 60) + " minutes ago" || diff < 7200 && "1 hour ago" || diff < 86400 && Math.floor(diff / 3600) + " hours ago") || day_diff == 1 && "Yesterday" || day_diff < 10 && day_diff + " days ago" || Math.ceil(day_diff / 7) + " weeks ago";
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

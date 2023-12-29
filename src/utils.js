function addObjectToArray(arr, obj, unshift = false, avoidDuplicates = true) {
  // look for duplicate
  var duplicateItem = arr.findIndex(item => JSON.stringify(item) === JSON.stringify(obj))
  if (avoidDuplicates && duplicateItem >= 0) {
    arr.splice(duplicateItem, 1)
  }
  // add obj to array
  if (unshift) {
    arr.unshift(obj)
  } else {
    arr.push(obj)
  }
  return arr
}

/**
 * input: '2023-12-25'
 * output: '12/25/2023'
 */
function prettyDate(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('default').format(date)
}

/**
 * https://johnresig.com/blog/javascript-pretty-date/
 * input: '2023-12-27T17:08:19.021410+01:00'
 * output: '5 hours ago', 'Yesterday', '2 days ago'...
 */
function prettyRelativeDateTime(dateTimeString, short=false) {
  var date = new Date((dateTimeString || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
      diff = (((new Date()).getTime() - date.getTime()) / 1000),
      day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;

  if (short) {
    // replace 'days' with 'd', remove 'Yesterday'
    return day_diff == 0 && (
      diff < 60 && "just now" || diff < 120 && "1m ago" || diff < 3600 && Math.floor(diff / 60) + "m ago" || diff < 7200 && "1h ago" || diff < 86400 && Math.floor(diff / 3600) + "h ago") || day_diff < 7 && day_diff + "d ago" || day_diff < 31 && Math.ceil(day_diff / 7) + "w ago";
  }
  return day_diff == 0 && (
  diff < 60 && "just now" || diff < 120 && "1 minute ago" || diff < 3600 && Math.floor(diff / 60) + " minutes ago" || diff < 7200 && "1 hour ago" || diff < 86400 && Math.floor(diff / 3600) + " hours ago") || day_diff == 1 && "Yesterday" || day_diff < 7 && day_diff + " days ago" || day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago";
}


export default {
  addObjectToArray,
  prettyDate,
  prettyRelativeDateTime,
}

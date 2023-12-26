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

export default {
  addObjectToArray,
}

/**
 * Order keys follow the API "order_by" syntax: comma-separated fields,
 * prefixed with "-" for a descending order (e.g. "-date,-created")
 */

/**
 * input: '-date,-created'
 * output: 'date,created'
 */
function getOrderField(orderKey) {
  return orderKey
    .split(",")
    .map((field) => field.replace(/^-/, ""))
    .join(",");
}

/**
 * input: '-date,-created'
 * output: true
 */
function isOrderDesc(orderKey) {
  return orderKey.startsWith("-");
}

/**
 * input: '-date,-created'
 * output: 'date,created'
 * input: 'name'
 * output: '-name'
 */
function reverseOrder(orderKey) {
  return orderKey
    .split(",")
    .map((field) => (field.startsWith("-") ? field.slice(1) : `-${field}`))
    .join(",");
}

export default {
  getOrderField,
  isOrderDesc,
  reverseOrder,
};

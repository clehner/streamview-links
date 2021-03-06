var Q = require('map-filter-reduce/util')
var select = require('./select')

function id (e) { return e }

module.exports = function (index, query) {

  function bound (value, range, sentinel) {
    return (
      value == null    ? sentinel
    : Q.isRange(value) ? range(value)
    :                    value
    )
  }

  function build (index, map) {
    var a = [index.key]
    for(var i = 0; i < index.value.length; i++)
      a.push(map(query[index.value[i]]))
    return a
  }

  return {
    gte: build(index, function (value) {
      return bound(value, Q.lower, Q.LO)
    }),
    lt: build(index, function (value) {
      return bound(value, Q.upper, Q.HI)
    })
    //reverse, limit, live?
  }

}



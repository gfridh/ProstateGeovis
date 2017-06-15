import * as d3 from 'd3.promise'

const csv = require('../../dataset/mergetest.csv') // TODO: change file

export function people() {
  return d3.csv(csv)
  .then(response => response)
}


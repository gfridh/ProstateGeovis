import { people, psa } from 'services/people'
import * as mary from 'services/municipalities'

import _ from 'lodash'

import moment from 'moment'

// Get a municipality, cross-checks with PSA value and returns the appropriate color value.

var getArrayAverage = function(array) {
  var sum = array.reduce(function(a, b) { return a + b; });
  var avg = sum / array.length;
  return avg
}

export function averagePSA() {
  let municipalities = mary.default.reduce((result, entry) => { result[entry] = []; return result }, {})

  return people()
    .then(response => response)
    .then(people => {
      // console.log("municipalities", municipalities)
      for (var i = 0; i < people.length; i++) {
        if (municipalities[people[i]["municipality"]]) {
          let value = parseFloat(people[i]["psa_total"])
          municipalities[people[i]["municipality"]].push(value)
        }
      }

      for (var key in municipalities) {
        municipalities[key] = getArrayAverage(municipalities[key])
      }

      return municipalities
    })
}

export function filterByPSA(params) {
  let { min, max, variable } = params
  return psa()
  .then(people => {
    console.log("total: ", people.length)
    return people
      .filter(person => { if (min) { console.log("filtering"); return person[variable] > min } else { return true } })
      .filter(person => { if (max) { return person[variable] < max } else { return true } })
    }
  ).then((people) => { console.log(people); return people })
}

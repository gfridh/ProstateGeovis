import * as d3 from 'd3.promise'
import _ from 'lodash'
import moment from 'moment'


const csv = require('../../dataset/first_psa_and_death.csv')
const psa_csv = require('../../dataset/psa.csv')
const snickar_csv = require('../../dataset/snickare.csv')

let person_histories = null

import { population, sankey_template } from './constants'

export function people() {
  return d3.csv(csv)
  .then(response => response)
}

export function psa() {
  return d3.csv(psa_csv)
  .then(response => response)
}

export function snickare() {
  let data = {}
  d3.csv(snickar_csv)
  .then(response => {
    data = _.groupBy(response, (d) => {
      let psa = d.psa_total
      if (psa <= 5) {
        return 0
      } else if (psa <= 10) {
        return 1
      } else if (psa <= 20) {
        return 3
      } else {
        return 4
      }
      // Math.floor(d.psa_total / 10)
    })
    // data = response; return response
    return data
  })
  .then(response => { console.log("snickare", response); return data })
}

export function sankey(filters) {
  let { psa, regions, age } = filters

  let json = JSON.parse(JSON.stringify(sankey_template))
  json.regions = {}

  return d3.json(process.env.PUBLIC_URL + '/person_histories.json')
  .then(response => {

    let counts = {}
    // const population = Object.values(response).reduce((acc, region) => { return acc + Object.keys(region).length }, 0)

    Object.keys(response).forEach(region => {
      if (regions && regions.length > 0 && !regions.includes(region.toLowerCase())) {
        return
      }

      json.regions[region.toLowerCase()] = Object.keys(response[region]).length / population[region] * 100

      Object.keys(response[region]).forEach(person => {
          let events = response[region][person]

          if (events.some(e => e.event === 'birth')) {
            let birth = events.find(e => e.event === 'birth')
            let other = events.find(e => e.event !== 'birth' && e.date)
            let person_age = moment(other.date).diff(moment(birth.date), 'years')
            if (age && (person_age < age[0] || person_age > age[1])) {
              return
            }
          }

          if (events.some(e => e.event === 'psa')) {
            let psa_value = events.find(e => e.event === 'psa').psa_tot
            if (psa && (psa_value < psa[0] || psa_value > psa[1])) {
              return
            }
            counts['psa'] = ~~counts['psa'] + 1
          }

          if (events.some(e => e.event === 'biopsy')) {
            counts['biopsy'] = ~~counts['biopsy'] + 1
            if (events.find(e => e.event === 'biopsy').cancer_in_bio) {
              counts['positive_diagnose'] = ~~counts['positive_diagnose'] + 1
            } else {
              counts['negative_diagnose'] = ~~counts['negative_diagnose'] + 1
            }
          }
          if (events.some(e => e.event === 'diag')) {
            if (events.find(e => e.event === 'diag').treatment) {
              let treatment = events.find(e => e.event === 'diag').treatment
              if (treatment === 'NaN') {
                return
              }
              counts[treatment] = ~~counts[treatment] + 1
              if (events.find(e => e.event === 'death')) {
                let death = events.find(e => e.event === 'diag').treatment + '_death'
                if (death === 'NaN') {
                  return
                }
                counts[death] = ~~counts[death] + 1
              }
            }
          }

          if (events.some(e => e.event === 'diag')) {
            if (events.find(e => e.event === 'diag').treatment && events.find(e => e.event === 'death')) {
              let treatment = events.find(e => e.event === 'diag').treatment + '_death'
              if (treatment === 'NaN') {
                return
              }
              counts[treatment] = ~~counts[treatment] + 1
            }
          }
      })
    })


    json.links.find(link => link.desc === "PSA -> Biopsy").value = counts.biopsy
    json.links.find(link => link.desc === "PSA -> Missing").value = counts.psa - counts.biopsy

    json.links.find(link => link.desc === "Bio -> Diagnos").value = counts.positive_diagnose
    json.links.find(link => link.desc === "Bio -> Frisk").value = counts.negative_diagnose

    json.links.find(link => link.desc === "Diagnos -> Conservative").value = counts['Conservative therapy']
    json.links.find(link => link.desc === "Diagnos -> Curative").value = counts['Treatment with curative intent']
    json.links.find(link => link.desc === "Diagnos -> Non-curative").value = counts['Treatment with no curative intent']
    json.links.find(link => link.desc === "Diagnos -> Missing").value = counts.positive_diagnose - counts['Treatment with no curative intent'] - counts['Treatment with curative intent'] - counts['Conservative therapy']

    json.links.find(link => link.desc === "Conservative -> Death").value = counts['Conservative therapy_death']
    json.links.find(link => link.desc === "Curative -> Death").value = counts['Treatment with curative intent_death']
    json.links.find(link => link.desc === "Non-curative -> Death").value = counts['Treatment with no curative intent_death']

    json.links.find(link => link.desc === "Conservative -> Frisk").value = counts['Conservative therapy'] - counts['Conservative therapy_death']
    json.links.find(link => link.desc === "Curative -> Frisk").value = counts['Treatment with curative intent'] - counts['Treatment with curative intent_death']
    json.links.find(link => link.desc === "Non-curative -> Frisk").value =  counts['Treatment with no curative intent'] - counts['Treatment with no curative intent_death']

    return json
  })
}

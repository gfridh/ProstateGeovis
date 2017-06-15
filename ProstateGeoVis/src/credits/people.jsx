import React from 'react'

import aron from './md/aron'
import axel from './md/axel'
import christoffer from './md/christoffer'
import gusse from './md/gusse'
import mattsson from './md/mattsson'
import marcus from './md/marcus'
import peter from './md/peter'
import rasmus from './md/rasmus'
import robin from './md/robin'

const map = {
  aron: aron,
  axel: axel,
  christoffer: christoffer,
  gusse: gusse,
  mattsson: mattsson,
  marcus: marcus,
  peter: peter,
  rasmus: rasmus,
  robin: robin
}

export function get(person) {
  if (person == '' ) {
    return null
  }
  return map[person]()
}

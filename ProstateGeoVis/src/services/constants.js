export const population = {
  "Botkyrka": 46244.25000,
  "Danderyd": 15999.97000,
  "Ekerö": 13812.62400,
  "Haninge": 43446.35100,
  "Huddinge": 54306.69000,
  "Järfälla": 37503.64800,
  "Lidingö": 22864.26400,
  "Nacka": 49282.06400,
  "Norrtälje": 29947.68000,
  "Nykvarn": 5347.51200,
  "Nynäshamn": 14042.51200,
  "Salem": 8207.81000,
  "Sigtuna": 23507.19200,
  "Sollentuna": 35440.47700,
  "Solna": 38986.37100,
  "Stockholm": 458453.31000,
  "Sundbyberg": 24018.25000,
  "Södertälje": 48072.54800,
  "Tyresö": 23551.50000,
  "Täby": 34415.45600,
  "Upplands_Väsby": 22033.28200,
  "Upplands-Bro": 13484.52000,
  "Vallentuna": 16392.50000,
  "Vaxholm": 5764.01600,
  "Värmdö": 21252.00000,
  "Österåker": 21906.25800
};

export const sankey_template = {
  "nodes": [
    {
      "name": "PSA"
    },
    {
      "name": "Biopsy"
    },
    {
      "name": "Diagnosed with cancer"
    },
    {
      "name": "Treatment with conservative intent"
    },
    {
      "name": "Treatment with curative intent"
    },
    {
      "name": "Treatment with non-curative intent"
    },
    {
      "name": "Death"
    },
    {
      "name": "Still in system"
    },
    {
      "name": "Missing"
    }
], "links": [
    {
      "source": 0,
      "target": 1,
      "value": 1,
      "desc": "PSA -> Biopsy"
    },
    {
      "source": 0,
      "target": 8,
      "value": 1,
      "desc": "PSA -> Missing"
    },
    {
      "source": 1,
      "target": 2,
      "value": 1,
      "desc": "Bio -> Diagnos"
    },
    {
      "source": 1,
      "target": 7,
      "value": 1,
      "desc": "Bio -> Frisk"
    },
    {
      "source": 1,
      "target": 8,
      "value": 1,
      "desc": "Bio -> Missing"
    },
    {
      "source": 2,
      "target": 3,
      "value": 1,
      "desc": "Diagnos -> Conservative"
    },
    {
      "source": 2,
      "target": 4,
      "value": 1,
      "desc": "Diagnos -> Curative"
    },
    {
      "source": 2,
      "target": 5,
      "value": 1,
      "desc": "Diagnos -> Non-curative"
    },
    {
      "source": 2,
      "target": 8,
      "value": 1,
      "desc": "Diagnos -> Missing"
    },
    {
      "source": 3,
      "target": 6,
      "value": 1,
      "desc": "Conservative -> Death"
    },
    {
      "source": 3,
      "target": 7,
      "value": 1,
      "desc": "Conservative -> Frisk"
    },
    {
      "source": 4,
      "target": 6,
      "value": 1,
      "desc": "Curative -> Death"
    },
    {
      "source": 4,
      "target": 7,
      "value": 1,
      "desc": "Curative -> Frisk"
    },
    {
      "source": 5,
      "target": 6,
      "value": 1,
      "desc": "Non-curative -> Death"
    },
    {
      "source": 5,
      "target": 7,
      "value": 1,
      "desc": "Non-curative -> Frisk"
    }
  ]
}

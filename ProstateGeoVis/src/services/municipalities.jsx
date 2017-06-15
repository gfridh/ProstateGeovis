export const municipalities = [
  "Botkyrka",
  "Danderyd",
  "Ekerö",
  "Haninge",
  "Huddinge",
  "Järfälla",
  "Lidingö",
  "Nacka",
  "Norrtälje",
  "Nykvarn",
  "Nynäshamn",
  "Salem",
  "Sigtuna",
  "Sollentuna",
  "Solna",
  "Stockholm",
  "Sundbyberg",
  "Södertälje",
  "Tyresö",
  "Täby",
  "Upplands-Bro",
  "Upplands-Väsby",
  "Vallentuna",
  "Vaxholm",
  "Värmdö",
  "Österåker"
]

export function listWithObjects() {
  return municipalities.reduce((result, entry) => {
    result[entry] = []
    return result
  }, {})
}

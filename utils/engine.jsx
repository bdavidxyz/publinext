import Engine from 'publicodes'
import { parse } from 'yaml'

// On définit une liste de règles publicodes
const rules = `
prix:
prix . carottes: 2€/kg
prix . champignons: 5€/kg
prix . avocat: 2€/avocat

dépenses primeur:
  formule:
    somme:
      - prix . carottes * 1.5 kg
      - prix . champignons * 500g
      - prix . avocat * 3 avocat
`
// publicodes ne prend plus en entrée du YAML, vous devez parser vous-même votre code source
const parsedRules = parse(rules)

// On initialise un moteur en lui donnant le publicodes sous forme d'objet javascript.
// Ce publicodes va être parsé
const engine = new Engine(parsedRules)

export default engine;

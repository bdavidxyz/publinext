

Ceci est un projet [Next.js](https://nextjs.org/) "from scratch", avec le strict minimum de fichiers/dépendances pour illustrer l'intégration d'une documentation publicode dans un projet NextJS.

Voici les étapes

## Prérequis

Projet créé avec Node v18.11.0 et Yarn 1.22.19

## Comment ce projet a été créé

D'abord, créer le projet puis ajouter les dépendances

```bash
npx create-next-app publinext --javascript --eslint --no-tailwind --no-src-dir --app --import-alias '@/*'
cd publinext
yarn add publicodes@1.0.0-beta.72
yarn add publicodes-react@1.0.0-beta.72
yarn add yaml
```

D'abord créez un fichier `utils/engine.jsx` qui va contenir un moteur de règle basique

```js
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
```

Puis créez un fichier `components/CustomRulePage.jsx`

```js
import Head from 'next/head';
import Link from 'next/link'
import { RulePage } from 'publicodes-react'
import engine from '../utils/engine'

export default function CustomRulePage(props) {
  console.log('props', props);
  return (
    <RulePage
      documentationPath="/documentation"
      rulePath={props.slug}
      engine={engine}
      language="fr"
      renderers={{
        Head,
        Link: ({ to, children }) => <Link href={to}>{children}</Link>
      }}
    />
  )
}

```


Ensuite, créez un fichier sous `pages/documentation/[...slug].jsx`

Notez l'import dynamique de Next, car pour l'instant la documentation ne fonctionne pas en rendu serveur.

```js
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

export default function Documentation() {
  const router = useRouter()
  const rootDoc = "prix"
  const CustomRulePage = dynamic(() => import('../../components/CustomRulePage'), {
    ssr: false,
  })

  return <>
    <CustomRulePage slug={router?.query?.slug?.join("/") || rootDoc} />
  </>
}
```

Ensuite, lancez le server en local

```bash
yarn dev
```

Ouvrir [http://localhost:3000/documentation/prix](http://localhost:3000/documentation/prix)/

Vous pouvez naviguer entre les différentes règles dans la documentation qui s'affiche

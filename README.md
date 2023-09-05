
Pour l'instant ce repository illustre le bug [372](https://github.com/betagouv/publicodes/issues/372) de publicodes

Ceci est un projet [Next.js](https://nextjs.org/) "from scratch", avec le strict minimum de fichiers/dépendances pour illustrer ce bug.

Voici les étapes pour recréer ce bug

## Prérequis

Projet créé avec Node v18.11.0 et Yarn 1.22.19

## Comment ce projet a été créé

D'abord, créer le projet puis ajouter les dépendances

```bash
npx create-next-app publinext --javascript --eslint --no-tailwind --no-src-dir --app --import-alias '@/*'
cd publinext
yarn add publicodes@1.0.0-beta.71
yarn add publicodes-react@1.0.0-beta.71
yarn add yaml
```

Ensuite, créez un fichier sous `pages/documentation/[...slug].jsx`

```js
import Head from 'next/head';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RulePage } from 'publicodes-react'

export default function Documentation() {
  const { slug } = useRouter().query;
  return <RulePage
    documentationPath="/documentation"
    rulePath={slug.join('/')}
    language="fr"
    renderers={{
      Head,
      Link: ({ to, children }) => <Link href={to}><a>{children}</a></Link>
    }}
  />
}
```

Ensuite, lancez le server en local

```bash
yarn dev
```

Ouvrir [http://localhost:3000/documentation/aa](http://localhost:3000/documentation/aa)/

## Bug

Le bug suivant s'affiche :

> Server Error

> TypeError: import_styled_components.default.div is not a function

> file:///node_modules/publicodes-react/dist/index.cjs (6891:62)

La ligne 6891 de index.cjs est la suivante

`var AccordionContainer = import_styled_components.default.div`

Ce qui signifie que les "styled components" ne sont pas correctement chargés par la dépendance.

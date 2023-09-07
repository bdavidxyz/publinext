import Head from 'next/head';
import Link from 'next/link'
import { RulePage } from 'publicodes-react'
import engine from '../utils/engine'

export default function CustomRulePage(props) {
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

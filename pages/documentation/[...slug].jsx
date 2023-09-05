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

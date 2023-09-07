import Head from 'next/head';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RulePage } from 'publicodes-react'
import engine from '../../utils/engine'

export default function Documentation() {
  const router = useRouter()

  console.log('router.query.slug', router.query.slug);

  return <>
    <RulePage
      documentationPath="/documentation"
      rulePath={"prix"}
      engine={engine}
      language="fr"
      renderers={{
        Head,
        Link: ({ to, children }) => <Link href={to}><a>{children}</a></Link>
      }}
    />
  </>
}

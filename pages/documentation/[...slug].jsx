import Head from 'next/head';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RulePage } from 'publicodes-react'

export default function Documentation() {
  const router = useRouter()

  return 

  <>
    {router.query.slug}
    <RulePage
      documentationPath="/documentation"
      rulePath={router.query.slug.join('/')}
      language="fr"
      renderers={{
        Head,
        Link: ({ to, children }) => <Link href={to}><a>{children}</a></Link>
      }}
    />
  </>
}

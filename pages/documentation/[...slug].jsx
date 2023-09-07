import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

export default function Documentation() {
  const router = useRouter()

  console.log('router.query.slug', router.query.slug);

  const CustomRulePage = dynamic(() => import('../../components/CustomRulePage'), {
    ssr: false,
  })

  return <>
    <CustomRulePage></CustomRulePage>
  </>
}

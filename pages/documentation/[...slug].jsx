import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

export default function Documentation() {
  const router = useRouter()
  const CustomRulePage = dynamic(() => import('../../components/CustomRulePage'), {
    ssr: false,
  })

  return <>
    <CustomRulePage slug={router?.query?.slug?.join("/") || "prix"}></CustomRulePage>
  </>
}

import { useRouter } from 'next/router'
 
export default function Page() {
  const router = useRouter()
  return <p>Post42: {router.query.slug}</p>
}

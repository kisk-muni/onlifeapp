/** @jsx jsx */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { jsx, Link as Lstyle, Flex} from 'theme-ui'

const Navigation = () => {
  const router = useRouter()
  return (
    <Flex>
      <Link as={"/stats/"+router.query.slug+"?trida="+router.query.trida+"&tab=all"} href={{ pathname: '/stats', query: { slug: router.query.slug, trida: router.query.trida, tab: 'all' } }} passHref>
        <Lstyle
          sx={{
            variant: 'styles.subnavlink',
            color: ((router.pathname  === '/stats/[slug]' && router.query.tab === 'all') ? 'text' : 'gray'),
            borderBottom: ((router.pathname  === '/stats/[slug]' && router.query.tab === 'all') ? '2px solid #000' : '2px solid transparent'),
          }}>
          Statistika
        </Lstyle>
      </Link>
      <Link as={"/stats/"+router.query.slug+"?trida="+router.query.trida+"&tab=individual"} href={{ pathname: '/stats', query: { slug: router.query.slug, trida: router.query.trida, tab: 'individual' } }} passHref>
        <Lstyle
          sx={{
            variant: 'styles.subnavlink',
            color: ((router.pathname  === '/stats/[slug]' && router.query?.tab === 'individual') ? 'text' : 'gray'),
            borderBottom: ((router.pathname  === '/stats/[slug]' && router.query?.tab === 'individual') ? '2px solid #000' : '2px solid transparent'),
          }}>
          Individuální výsledky
        </Lstyle>
      </Link>
    </Flex>
  )
}

export default Navigation
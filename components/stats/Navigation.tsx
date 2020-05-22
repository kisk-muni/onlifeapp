/** @jsx jsx */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { jsx, Link as Lstyle, Flex} from 'theme-ui'

const StatsNavigation = () => {
  const router = useRouter()
  return (
    <Flex>
      <Link as={"/stats/"+router.query.slug+"?trida="+router.query.trida} href={{ pathname: '/studenti', query: { slug: router.query.slug, trida: router.query.trida } }} passHref>
        <Lstyle
          sx={{
            variant: 'styles.subnavlink',
            color: (router.pathname  === '/stats/[slug]' ? 'text' : 'gray'),
            borderBottom: (router.pathname  === '/stats/[slug]' ? '2px solid #000' : '2px solid transparent'),
          }}>
          Statistika
        </Lstyle>
      </Link>
      <Link as={"/studenti?trida="+router.query.trida} href={{ pathname: '/studenti', query: { trida: router.query.trida } }} passHref>
        <Lstyle
          sx={{
            variant: 'styles.subnavlink',
            color: (router.pathname  == '/studenti' ? 'text' : 'gray'),
            borderBottom: (router.pathname  == '/studenti' ? '2px solid #000' : '2px solid transparent'),
          }}>
          Individuální výsledky
        </Lstyle>
      </Link>
    </Flex>
  )
}

export default StatsNavigation
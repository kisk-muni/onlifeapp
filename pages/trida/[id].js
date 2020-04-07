import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { withApollo } from '../../lib/apollo'
import { Flex, Box } from 'reflexbox'
import { jsx, Text, Heading } from 'theme-ui'

const Trida = () => {
  const router = useRouter();

  return (
    <Layout>
      <Flex flexWrap='wrap' width="100%">
        <Box
          width={[1, 5/6]}
          maxWidth={1240}
          mx="auto"
          px={35}
          py={60}
        >
          <Heading>Tady bude třída</Heading>
          <Text>ID třídy: {router.query.id}</Text>
        </Box>
      </Flex>
    </Layout>
  );
  
}

export default withApollo()(Trida)
import Layout from '../components/Layout'
import { withApollo } from '../lib/apollo'
import { Flex, Box } from 'reflexbox'

const Example = () => {
    return (
      <Layout>
        <Flex flexWrap='wrap'>
          <Box maxWidth={1240} px={35} mx="auto" width={[ 1 ]} >
            <p>This is the Example page</p>
          </Box>
        </Flex>
      </Layout>
    );
  }

export default withApollo()(Example)
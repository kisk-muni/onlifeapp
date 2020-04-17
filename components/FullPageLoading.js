import { Spinner } from "@blueprintjs/core"
import { Flex, Box, jsx, Text, Heading, Grid, Button } from 'theme-ui'

const FullPageLoading = () => (
  <Flex sx={{
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    minHeight: '100vh',
    justifyContent: 'center',
    background: '#f5f5f5'
    }}>
    <Box>
      <Spinner intent="primary" size={32} />
    </Box>
  </Flex>
)

export default FullPageLoading
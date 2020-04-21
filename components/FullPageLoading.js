import { Spinner } from "@blueprintjs/core"
import { Flex, Box, jsx, Text, Heading, Grid, Button } from 'theme-ui'

const FullPageLoading = ({dashboard = false}) => (
  <Flex sx={{
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    minHeight: (dashboard ? '80vh' : '100vh'),
    justifyContent: 'center',
    background: (dashboard ? '#f5f5f5' : '#fff')
    }}>
    <Box>
      <Spinner intent="none" size={32} />
    </Box>
  </Flex>
)

export default FullPageLoading
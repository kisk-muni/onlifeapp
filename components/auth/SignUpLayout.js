/** @jsx jsx */
import Footer from '../Footer'
import MasarykBar from '../MasarykBar'
import { jsx } from 'theme-ui'
import { Flex, Box } from 'reflexbox'
// <MasarykBar />
const SignUpLayout = props => (
  <Flex
    flexDirection="column"
    sx={{
      // set this to `minHeight: '100vh'` for full viewport height
      minHeight: '100vh',
    }}>
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        flex: '1',
      }}>
      {props.children}
    </Box>
    <Box sx={{
        background: '#fafafa',
      }}>
      <Footer />
    </Box>
  </Flex>
);

export default SignUpLayout
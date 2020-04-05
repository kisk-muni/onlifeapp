/** @jsx jsx */
import Header from './Header'
import Footer from './Footer'
import MasarykBar from './MasarykBar'
import { jsx, Text } from 'theme-ui'
import { Flex, Box } from 'reflexbox'
// <MasarykBar />
const StarterLayout = props => (
  <div
    sx={{
      display: 'flex',
      flexDirection: 'column',
      background: "#f6f6f6",
      // set this to `minHeight: '100vh'` for full viewport height
      minHeight: '100vh',
    }}>
    <main sx={{ width: '100%', flex: '1 1 auto' }}>
      <Header headerStyle="styles.headerHomepage" navlink="styles.navlinklight"  navlogo="styles.navlogolight" />
      {props.children}
    </main>
    <Footer />
  </div>
);

export default StarterLayout
/** @jsx jsx */
import Header from './Header'
import Footer from './Footer'
import MasarykBar from './MasarykBar'
import { jsx, Text } from 'theme-ui'
import { Sticky, StickyContainer } from 'react-sticky'
import { Flex, Box } from 'reflexbox'
// <MasarykBar />
const StarterLayout = props => (
  <StickyContainer>
    <Sticky>
      {({ style, distanceFromTop }) => 
        <div style={style}
          className={(distanceFromTop == 0 ? 'not-sticky' : 'is-sticky')}  
          sx={{
            zIndex: 90
          }}>
        <Header headerStyle="styles.headerHomepage" navlink="styles.navlinklight"  navlogo="styles.navlogolight" />
      </div>
      }
    </Sticky>
      <style jsx>{`
        .is-sticky {
          box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15);
        }
        .not-sticky {
          box-shadow: none;
        }
      `}</style>
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: "#f6f6f6",
        // set this to `minHeight: '100vh'` for full viewport height
        minHeight: '100vh',
      }}>
      <main sx={{ width: '100%', flex: '1 1 auto' }}>
        {props.children}
      </main>
      <Footer />
    </div>
  </StickyContainer>
);

export default StarterLayout
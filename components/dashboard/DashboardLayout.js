/** @jsx jsx */
import Footer from '../Footer'
import { jsx } from 'theme-ui'
import { Sticky, StickyContainer } from 'react-sticky'

const DashboardLayout = ({header, showDescription = () => false, stickHeaderByDefault = false, ...props}) => (
  <StickyContainer>
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bg: 'sheet'
      }}>
      <Sticky>
      {({ style }) => 
        <div style={style} sx={{zIndex: 18}}
          className="is-sticky">
          {header}
      </div>
      }
    </Sticky>
    <style jsx>{`
      .is-sticky {
        box-shadow: 0 0 15px 0 rgba(0,0,0,.1);
        transition: box-shadow .1s ease 0s;
      }
      .not-sticky {
        transition: box-shadow .1s ease 0s;
        box-shadow: none;
      }
    `}</style>
      <main sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', flexWrap: 'wrap' }}>
        {props.children}
      </main>
      <Footer />
    </div>
  </StickyContainer>
)

export default DashboardLayout
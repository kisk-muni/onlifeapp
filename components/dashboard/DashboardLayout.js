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
        background: '#fafafa'
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
        box-shadow: 0 1px 0 0 rgba(0,0,0,0.1);
        transition: box-shadow .1s ease 0s;
        -webkit-backdrop-filter: saturate(180%) blur(5px);
        backdrop-filter: saturate(180%) blur(5px);
      }
    `}</style>
      <main sx={{ width: '100%', flex: '1 1 auto' }}>
        {props.children}
      </main>
      <Footer />
    </div>
  </StickyContainer>
)

export default DashboardLayout
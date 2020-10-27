/** @jsx jsx */
import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import { jsx } from 'theme-ui'
import { Sticky, StickyContainer } from 'react-sticky'
// <MasarykBar />
const StarterLayout = ({ children, ...props }: { children: ReactNode }) => (
  <StickyContainer>
    <div
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
      <Sticky>
      {({ style }) => {
        return (
          <div style={{zIndex: 18, ...style}}>
            <Header/>
          </div>
        )
      }
      }
    </Sticky>
      <main sx={{ width: '100%', flex: '1 1 auto' }}>
        {children}
      </main>
      <Footer />
    </div>
  </StickyContainer>
);

export default StarterLayout
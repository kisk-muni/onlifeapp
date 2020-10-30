/** @jsx jsx */
import { ReactNode, createRef } from 'react'
import Header from './Header'
import Footer from './Footer'
import { jsx } from 'theme-ui'
import { Sticky, StickyProvider } from 'react-stickup'

const container = createRef()

// <MasarykBar />
const StarterLayout = ({ children, ...props }: { children: ReactNode }) => (
  <StickyProvider>
    <div
      ref={container as React.RefObject<HTMLDivElement>}
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
      <Sticky container={container} style={{zIndex: 100}}>
        <Header/>
      </Sticky>
      <main sx={{ width: '100%', flex: '1 1 auto' }}>
        {children}
      </main>
      <Footer />
    </div>
  </StickyProvider>
);

export default StarterLayout
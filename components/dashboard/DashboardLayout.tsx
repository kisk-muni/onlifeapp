/** @jsx jsx */
import { jsx } from 'theme-ui'
import { ReactNode, createRef } from 'react'
import Footer from 'components/Footer'
import { Sticky, StickyProvider } from 'react-stickup'

const container = createRef()

// <MasarykBar />
const DashboardLayout = ({ children, header, ...props }: { header: ReactNode, children: ReactNode }) => (
  <StickyProvider>
    <div
      ref={container as React.RefObject<HTMLDivElement>}
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bg: 'snow'
      }}>
      <Sticky container={container} style={{zIndex: 100}}>
        {header}
      </Sticky>
      <main sx={{ width: '100%', flex: '1 1 auto' }}>
        {children}
      </main>
      <Footer />
    </div>
  </StickyProvider>
);

export default DashboardLayout
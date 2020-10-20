/** @jsx jsx */
import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import { jsx } from 'theme-ui'
import { Sticky, StickyContainer } from 'react-sticky'
// <MasarykBar />
const StarterLayout = ({ children, stickHeaderByDefault }: { children: ReactNode, stickHeaderByDefault: boolean }) => (
  <StickyContainer>
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
      <Sticky>
      {({ style, distanceFromTop, distanceFromBottom }) => {
        let newDistanceFromTop = 0
        if (typeof distanceFromTop !== 'undefined') {
          newDistanceFromTop = distanceFromTop
        }
        const isSticky = stickHeaderByDefault || (newDistanceFromTop >= 0) 
        return (
          <div style={{zIndex: 18, ...style}}
            className={(isSticky ? 'not-sticky' : 'is-sticky')}>
            <Header/>
          </div>
        )
      }
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
      <main sx={{ width: '100%', flex: '1 1 auto' }}>
        {children}
      </main>
      <Footer />
    </div>
  </StickyContainer>
);

export default StarterLayout
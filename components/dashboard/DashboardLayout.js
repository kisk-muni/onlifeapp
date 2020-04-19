/** @jsx jsx */
import GroupHeader from './GroupHeader'
import Footer from '../Footer'
import { jsx, Text } from 'theme-ui'
import { Sticky, StickyContainer } from 'react-sticky'
import { Flex, Box } from 'reflexbox'
// <MasarykBar />

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
      {({ style, distanceFromTop, distanceFromBottom }) => 
        <div style={style}
          className={((stickHeaderByDefault || (distanceFromTop != 0)) ? 'is-sticky' : 'not-sticky')}>
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
      .not-sticky {
        transition: box-shadow .1s ease 0s;
        box-shadow: none;
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

/* ({ showDescription = () => false, stickHeaderByDefault = false, ...props }) => (
  <StickyContainer>
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: '#fafafa'
      }}>
      <Sticky>
      {({ style, distanceFromTop, distanceFromBottom }) => 
        <div style={style}
          className={((stickHeaderByDefault || (distanceFromTop != 0)) ? 'is-sticky' : 'not-sticky')}>
        <GroupHeader showDescription={showDescription(distanceFromTop, distanceFromBottom)}/>
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
      .not-sticky {
        transition: box-shadow .1s ease 0s;
        box-shadow: none;
      }
    `}</style>
      <main sx={{ width: '100%', flex: '1 1 auto' }}>
        {props.children}
      </main>
      <Footer />
    </div>
  </StickyContainer>
); */

/* export const GroupSelectLayout = ({ showDescription = () => false, stickHeaderByDefault = false, ...props }) => (
  <StickyContainer>
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: '#fafafa'
      }}>
      <Sticky>
      {({ style, distanceFromTop, distanceFromBottom }) => 
        <div style={style}
          className={((stickHeaderByDefault || (distanceFromTop != 0)) ? 'is-sticky' : 'not-sticky')}>
        <GroupHeader showDescription={showDescription(distanceFromTop, distanceFromBottom)}/>
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
      .not-sticky {
        transition: box-shadow .1s ease 0s;
        box-shadow: none;
      }
    `}</style>
      <main sx={{ width: '100%', flex: '1 1 auto' }}>
        {props.children}
      </main>
      <Footer />
    </div>
  </StickyContainer>
); */
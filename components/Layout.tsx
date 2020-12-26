/** @jsx jsx */
import { ReactNode, createRef } from 'react'
import Footer from './Footer'
import { jsx, Link, Box, Grid, Text } from 'theme-ui'
import { Sticky, StickyProvider } from 'react-stickup'

const Header = () => {
 return (
  <Grid as="header"
    sx={{
      display: 'grid',
      gridGap: 3,
      gridTemplateColumns: 'repeat(3, 1fr)',
      px: 3,
      py: 1,
      bg: 'primary',
      alignItems: 'center',
      boxShadow: 'small',
      color: 'background'
    }}>
    <button
      title='Toggle Menu'
      sx={{
        appearance: 'none',
        width: 32,
        height: 32,
        m: 0,
        p: 1,
        color: 'inherit',
        bg: 'transparent',
        border: 0,
        ':focus': {
          outline: '2px solid',
      },
      ':hover': {
        color: 'primary',
      },
      }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width='24'
          height='24'
          fill="currentcolor"
          viewBox="0 0 24 24"
          sx={{
            display: 'block',
            margin: 0,
          }}>
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
    </button>
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Link
        href='/'
        sx={{
          variant: 'styles.navlink',
          px: 3,
          lineHeight: 1.1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Text 
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 'bold',
              color: 'background',
            }}>
            Onlife
          </Text>
          <Text sx={{fontSize: 1, color: 'background'}}>Kvízy informační gramotnosti</Text>
      </Link>
    </div>
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
      <Link
        to='/blog'
        sx={{
          variant: 'styles.navlink',
          color: 'background',
          ml: 3,
          py: 3,
        }}>
        Progress 
      </Link>
    </div>
  </Grid>
 )
}

const container = createRef()

const Layout = ({ children, ...props }: { children: ReactNode }) => (
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

export default Layout


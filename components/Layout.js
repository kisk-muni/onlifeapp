/** @jsx jsx */
import Header from './Header'
import Footer from './Footer'
import MasarykBar from './MasarykBar'
import { jsx } from 'theme-ui'
// <MasarykBar />
const Layout = props => (
  <div
    sx={{
      display: 'flex',
      flexDirection: 'column',
      // set this to `minHeight: '100vh'` for full viewport height
      minHeight: '100vh',
      background: '#fff'
    }}>
    
    <main
    sx={{
      width: '100%',
      flex: '1 1 auto',
    }}>
      <Header />
      {props.children}
    </main>
    <style jsx global>{`
      body {
        margin: 0;
        padding: 0;
      }
    `}</style>
    <footer
      sx={{
        width: '100%',
      }}>
      <Footer />
    </footer>
  </div>
);

export default Layout
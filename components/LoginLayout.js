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
    }}>
    <main
    sx={{
      width: '100%',
      pt: 150,
      flex: '1 1 auto',
    }}>
      {props.children}
    </main>
    <footer
      sx={{
        width: '100%',
      }}>
      <Footer />
    </footer>
  </div>
);

export default Layout
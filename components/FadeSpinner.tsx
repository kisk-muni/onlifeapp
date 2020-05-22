/** @jsx jsx */
import Reveal from './Reveal'
import { jsx, Box } from 'theme-ui'
import { Spinner } from "@blueprintjs/core"

const FadeSpinner = ({...props}) => (
  <Box {...props}>
    <Reveal delay={1000} duration={1000}>
      <Spinner intent="none" size={32} sx={{my: 7}} />
    </Reveal> 
</Box>
)

export default FadeSpinner

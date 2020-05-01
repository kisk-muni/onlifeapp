import Reveal from './Reveal'
import { Spinner } from "@blueprintjs/core"

const FadeSpinner = () => <Reveal delay={1000} duration={1000}>
  <Spinner intent="none" size={32} sx={{my: 7}} />
</Reveal> 

export default FadeSpinner

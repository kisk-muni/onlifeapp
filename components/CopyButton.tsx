/** @jsx jsx */
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { jsx, Button } from 'theme-ui'
import { Popover, Callout } from '@blueprintjs/core'

const CopiedCallout = () => <Callout intent="success"><span sx={{color: '#0d8050'}}>Zkopírováno do schránky</span></Callout>

const CopyButton = ({textToCopy}: {textToCopy: string}) => (
    <Popover popoverClassName="popover-success" hoverCloseDelay={300}>
      <CopyToClipboard text={textToCopy}> 
        <Button sx={{bg: 'black', fontSize: 3}}>
          Kopírovat
        </Button>
      </CopyToClipboard>
      <CopiedCallout />
    </Popover>
  )

export default CopyButton
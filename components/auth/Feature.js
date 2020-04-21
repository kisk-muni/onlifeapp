/** @jsx jsx */
import { jsx, Text, Heading } from 'theme-ui'
import { Flex, Box } from 'reflexbox'

const Feature = ({heading, description}) => (
  <Flex sx={{mb: 4}}>
    <Box sx={{mr: '20px'}}>
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="#0000dc"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        shapeRendering="geometricPrecision"
        style={{color:'#0000dc', fill: '#0000dc', stroke: '#fff'}}>
        <path
          d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
          fill="#0000dc"
          stroke="#0000dc">
        </path>
        <path
          d="M8 11.8571L10.5 14.3572L15.8572 9"
          fill="none" stroke="#fff">
        </path>
      </svg>
    </Box>
    <Box>
      <Heading as="h2" mb={3}>{heading}</Heading>
      <Text sx={{fontSize: 2, color: 'gray'}}>{description}</Text>
    </Box>
 
  </Flex>
)

export default Feature
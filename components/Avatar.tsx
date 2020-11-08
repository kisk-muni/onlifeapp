/** @jsx jsx */
import { jsx, Box, Flex, Image } from 'theme-ui'

const Avatar = ({name, photoURL, ...props}: {name: string, photoURL?: string}) => {
  return (
    <Box
      {...props}
      sx={{
        backgroundColor: '#000',
        boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
        color: '#fff',
        textAlign: 'center',
        borderRadius: '50%'
      }}
    >
      { photoURL
      && <Image src={photoURL} alt={name} />
      }
    </Box>
  )
}

export default Avatar

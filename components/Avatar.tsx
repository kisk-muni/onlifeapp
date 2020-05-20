/** @jsx jsx */
import { jsx, Box, Flex, Image } from 'theme-ui'

function stringToHslColor(str: string, s: number, l: number): string {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  var h = hash % 360
  return 'hsl('+h+', '+s+'%, '+l+'%)'
}

const Avatar = ({name, photoURL, ...props}: {name: string, photoURL?: string}) => {
  const inicials = name.split(" ").map((n)=>n[0]).join("")
  return (
    <Flex
      {...props}
      sx={{
        backgroundColor: stringToHslColor(name, 60, 35),
        boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
        color: '#fff',
        borderRadius: '50%'
      }}
    >
      { photoURL
      ? <Image src={photoURL} alt={name} />
      : inicials
      }
    </Flex>
  )
}

export default Avatar

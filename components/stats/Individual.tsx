/** @jsx jsx */
import { useState, Fragment } from 'react'
import { jsx, Button, Grid, Heading, Select, Text, Flex, Box } from 'theme-ui'
import Avatar from '../Avatar'

const Individual = ({students}: {students: {}[]}) => {
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(0)
  const testStudents = [
    {
      __typename: 'Student',
      id: 'nejakeid',
      name: 'nejakejmeno',
      email: 'email',
      picture: ''
    },
    {
      __typename: 'Student',
      id: 'nejakeid',
      name: 'jine jmeno',
      email: 'email',
      picture: ''
    },
    {
      __typename: 'Student',
      id: 'nejakeid',
      name: 'Ahojkyy',
      email: 'email',
      picture: ''
    },
    {
      __typename: 'Student',
      id: 'nejakeid',
      name: 'jine jmenodasfasf',
      email: 'email',
      picture: ''
    },
  ]

  return (
    <Box
      sx={{
        pt: 2,
        pb: 4,
        mb: 4,
      }}
    >
      <Flex>
        <Flex sx={{justifyContent: 'flex-end', alignItems: 'center'}}>
          {selectedStudentIndex !== 0 &&
            <Button sx={{mr: 3}} variant="studentsFilterAction" onClick={() => {
              if (selectedStudentIndex !== 0) {
                setSelectedStudentIndex(selectedStudentIndex - 1)
            }
          }}>Předešlý</Button>}
        </Flex>
        <Box sx={{width: '200px'}}>
          <Select sx={{
            backgroundColor: 'background',
            borderColor: '#ddd',
            fontWeight: 500,
            color: '#333',
            py: 2,
            px: 3,
            '&:hover': {
              borderColor: '#000',
              color: '#000'
            }
          }} value={selectedStudentIndex} onChange={(e) => setSelectedStudentIndex(parseInt(e.target.value))}>
            {testStudents.map((student, index) => (
              <option key={index} value={index}>{index + 1}. {student.name}</option>
            ))}
          </Select>
        </Box>
        <Box sx={{justifyContent: 'flex-start', alignItems: 'center'}}>
          {selectedStudentIndex !== (testStudents.length - 1) &&
            <Button sx={{ml: 3}} variant="studentsFilterAction" onClick={() => {
              if (selectedStudentIndex !== testStudents.length - 1) {
                setSelectedStudentIndex(selectedStudentIndex + 1)
              }
            }}>Další</Button>
          }
        </Box>
      </Flex>
      <Box sx={{mt: 3}}>
        <Heading sx={{fontSize: 7}}>{selectedStudentIndex+1}. {testStudents[selectedStudentIndex].name}</Heading>
      </Box>
    </Box>
  )
}

export default Individual
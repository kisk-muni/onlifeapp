/** @jsx jsx */
import { useState, Fragment } from 'react'
import { jsx, Button, Grid, Heading, Text, Flex, Box } from 'theme-ui'
import { BarChart, PieChart, Pie, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Avatar from '../Avatar'
import { Question } from '../../pages/api/quiz/[id]/[group_id]/stats'

// const StudentsBox = ({students, sentiment}: {students: Student[], sentiment: 'positive' | 'negative'}) => {
//   return (
//     <Box
//       sx={{
//         mb: 3,
//         backgroundColor: 'background',
//         border: '1px solid #ddd',
//         borderLeft: '3px solid',
//         borderLeftColor: (sentiment === 'positive' ? 'green' : 'red'),
//         borderRadius: '4px',
//         px: 3,
//         py: 2
//       }}>
//       <Heading sx={{mt: 2, mb: 3, textTransform: 'uppercase', fontSize: 1}}>
//         Odpověděli {(sentiment === 'positive' ? 'správně' : 'špatně')}
//       </Heading>
//       {students.map(student => 
//         <Flex sx={{mb: 2, alignItems: 'center'}}>
//           <Avatar
//             name={student.name}
//             photoURL={student.picture}
//             sx={{
//               height: '32px',
//               width: '32px',
//               lineHeight: '32px',
//               borderRadius: '16px',
//               overflow: 'hidden',
//               mr: 2
//             }} />
//           <Text sx={{fontSize: 2}}>{student.name}</Text>
//         </Flex>
//       )}
//     </Box>
//   )
// }

const COLORS = ['#3366cc', '#dc3912', '#ff9900', '#109619', '#990199']

const Item = ({question, index}: {question: Question, index: number}) => {
  const [showStudents, setShowStudents] = useState(false)
  let chosenCount = 0
  for (const [choice, chosen] of Object.entries(question.choices)) {
    chosenCount += chosen
  }
  // Object.entries(question.choices).forEach((choice, choiceIndex) => {
  //   chosenCount += choice.chosenCount
  //   data.push({
  //     name: (choice.choiceText.length <= 16) ? choice.choiceText : choice.choiceText.substring(0, 16) + '…', legendName: choice.choiceText, foo: choice.chosenCount, fill: COLORS[choiceIndex % COLORS.length]
  //   })
  // })

  return (
    <Box
      key={index}
      sx={{
        backgroundColor: 'background',
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 6px',
        pt: 3,
        pb: 4,
        px: 4,
        mb: 4,
      }}
    >
      <Text sx={{fontWeight: 'regular', fontSize: 3, mt: 1, mb: 2}}>
        {question.question}
        {!question.required && <span sx={{m: 2, fontStyle: 'italic', fontSize: 2, fontWeight: 'body', color: 'gray'}}>
          nepovinná otázka
        </span>}
      </Text>
      <Text sx={{fontWeight: 'regular', fontSize: 2, mb: 3}}>
        { chosenCount } {(chosenCount == 0 || chosenCount > 4) ? 'odpovědí' : ((chosenCount == 1) ? 'odpověď' : 'odpovědi' ) }
      </Text>
      { chosenCount !== 0 && <Fragment>
      <Grid gap="4" columns={2}>
        <Box sx={{height: '200px'}}>
          {/*question.type === 'singleselect' &&
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data} dataKey="foo" nameKey="name" cx="50%" cy="50%" outerRadius={100} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          */}
          {/*question.type === 'checkbox' &&
            <ResponsiveContainer>
              <BarChart layout="vertical" data={data}>
                <XAxis type="number" allowDecimals={false} domain={[0, 'dataMax']} />
                <YAxis width={80} type="category" dataKey="name" />
                <Bar dataKey="foo" barSize={20} />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          */}
        </Box>
        <Box sx={{pt: 2}}>
          <Box>
            {/*data.map(item => {
              return (
                <Flex sx={{alignItems: 'flex-start', mb: 2}}>
                  <Box sx={{flexBasis: '14px', flexGrow: 1, bg: item.fill, height: '14px', width: '14px', borderRadius: '7px', mr: 2,}}></Box>
                  <Text sx={{flexGrow: 99999, lineHeight: '16px', flexBasis: 0}}>{item.legendName}</Text>
                </Flex>
              )
            })*/}
          </Box>
          <Box sx={{mt: 4}}>
            {/*
              (question?.students?.correct.length > 0 || question?.students?.incorrect.length > 0) &&
              <Button variant="statsAction" onClick={() => setShowStudents(!showStudents)}>
                { !showStudents ? 'Zobrazit výsledky studentů' : 'Zavřít výsledky' }
              </Button>
            */}
            {/* showStudents &&
              <Box sx={{mt: 3}}>
                {question?.students?.correct.length > 0 && 
                  <StudentsBox students={question?.students?.correct} sentiment="positive" />
                }
                {question?.students?.incorrect.length > 0 && 
                  <StudentsBox students={question?.students?.incorrect} sentiment="negative" />
                }
              </Box>
              */}
          </Box>
        </Box>
      </Grid></Fragment> }
    </Box>
  )
}

export default Item
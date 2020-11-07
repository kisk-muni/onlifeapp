/** @jsx jsx */
import { useState, Fragment } from 'react'
import { jsx, Button, Grid, Heading, Text, Flex, Box } from 'theme-ui'
import { BarChart, PieChart, Pie, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Avatar from '../Avatar'
import { Question as StatsQuestion } from '../../pages/api/quiz/[id]/[group_id]/stats'
import { Item as Question } from 'pages/kviz/[slug]'

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
//         <Flexsx={{mb: 2, alignItems: 'center'}}>
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

const Item = ({question, index, statsQuestion}: {question: Question, index: number, statsQuestion?: StatsQuestion}) => {
  const [showStudents, setShowStudents] = useState(false)
  let chosenCount = 0


  const data: {
    name: string,
    legendName: string,
    number: number,
    fill: string
    isCorrect: boolean,
    correctFeedback: string,
    incorrectFeedback: string,
  }[] = []
  let i = 0
  let data_max = 0
  
  question.possibleResponds.forEach(respond => {
    const max_chars = 64
    const statQuestion = statsQuestion?.choices[respond.choiceText]
    let number = 0
    if (statQuestion) {
      number = statQuestion
    }
    if (number > data_max) {
      data_max = number
    }
    chosenCount += number
    data.push(
      {
        name: (respond.choiceText.length <= max_chars) ? respond.choiceText : respond.choiceText.substring(0, max_chars) + '…',
        legendName: respond.choiceText,
        number: statQuestion,
        fill: respond.isCorrect ? '#0d8000' : '#FF1A1A',
        isCorrect: respond.isCorrect,
        correctFeedback: respond.correctFeedback,
        incorrectFeedback: respond.incorrectFeedback
      }
    )
    i += 1
  })
  
  // console.log(question)
  // for (const [key, value] of Object.entries(choices)) {
  //   data.push({
  //     name: (key.length <= 16) ? key : key.substring(0, 16) + '…', legendName: key, number: value, fill: COLORS[i % COLORS.length]
  //   })
  //   i += 1
  // }

  //console.log(data)

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
      <Box sx={{pt: 2, ml: 1, mb: 3}}>
        <Box sx={{width: '100%', maxWidth: 500, borderLeft: '2px solid #666', pt: 3 }}>
          {data.map(item => {
            return (
              <Box sx={{mb: '24px', position: 'relative', ':hover': {bg: 'primary-accent-2'}}}>
                <Flex sx={{alignItems: 'flex-start', py: 1, justifyContent: 'center', pl: 1}}>
                  {
                    item.isCorrect ? 
                    <svg xmlns="http://www.w3.org/2000/svg" sx={{fill: item.fill}} viewBox="0 0 16 16" width="20" height="20"><path fill-rule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z"></path></svg>
                    :
                    <svg xmlns="http://www.w3.org/1600/svg" sx={{fill: item.fill}} viewBox="0 0 16 16" width="20" height="20"><path fill-rule="evenodd" d="M2.343 13.657A8 8 0 1113.657 2.343 8 8 0 012.343 13.657zM6.03 4.97a.75.75 0 00-1.06 1.06L6.94 8 4.97 9.97a.75.75 0 101.06 1.06L8 9.06l1.97 1.97a.75.75 0 101.06-1.06L9.06 8l1.97-1.97a.75.75 0 10-1.06-1.06L8 6.94 6.03 4.97z"></path></svg>
                  }
                  <Text sx={{flexGrow: 99999, fontSize: 2, lineHeight: 1.2, flexBasis: 0, ml: 1}}>{item.name}</Text>
                </Flex>
                <Text sx={{fontSize: 3, fontWeight: 'bold', position: 'absolute', right: '-30px', bottom: '0'}}>{item.number}⨉</Text>
                <Box sx={{bg: 'primary-accent-2', position: 'relative', ':after': {position: 'absolute', content: '""', left: '-10px', top: '11px', width: 20, height: 2, bg: '#666'}}}>
                  <Box sx={{bg: item.fill, height: '24px', mt: 0, width: (item.number/data_max*100).toString()+'%'}}></Box>
                </Box>
              </Box>
            )
          })}
          <Box sx={{bg: '#666', height: '2px', width: '100%'}}></Box>
          <Box sx={{position: 'relative'}}>
            <Box sx={{':after': {height: '20px', width: '2px', bg: '#666', content: '""', position: 'absolute', top: '-20px', left: '6.5px'}, position: 'absolute', top: '10px', left: '-8px', width: 16, height: 16, textAlign: 'center'}}>
              0
            </Box>
            <Box sx={{':after': {height: '20px', width: '2px', bg: '#666', content: '""', position: 'absolute', top: '-20px', right: '6.5px'}, position: 'absolute', top: '10px', right: '-8px', width: 16, height: 16, textAlign: 'center'}}>
              {data_max}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Item
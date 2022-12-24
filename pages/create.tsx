import { Box, InputGroup, Text, Input } from '@chakra-ui/react'

import { useCallback, useEffect, useMemo, useState } from 'react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import withTransition from '@components/withTransition'
import { dummyQuests } from '@data/quests'
import QuestCard from '@components/Card'
import PartnerCard from '@components/PartnerCard'

const CustomeInput = ({ e, tempOption, setTempOption }) => {
  return (
    <div style={{ paddingLeft: '3rem', paddingTop: '1rem', width: '80%' }}>
      <Input
        // value={tempOption}
        onChange={(e) => setTempOption(e.target.value)}
        placeholder="Option"
        size="sm"
      />
    </div>
  )
}

function Create() {
  const [data, setData] = useState<any>([
    {
      question: 'What is 8 x 1?',
      answers: ['1', '8', '16', '9'],
      correct: 1,
    },
    {
      question: 'Who is Steve Jobs?',
      answers: [
        'CEO of Microsoft',
        'Barber in NY',
        'Movie Star',
        'CEO of Apple',
      ],
      correct: 3,
    },
    {
      question: 'What is 8 x 1?',
      answers: ['1', '8', '16', '9'],
      correct: 1,
    },
    {
      question: 'Who is Steve Jobs?',
      answers: [
        'CEO of Microsoft',
        'Barber in NY',
        'Movie Star',
        'CEO of Apple',
      ],
      correct: 3,
    },
    {
      question: 'What is 8 x 1?',
      answers: ['1', '8', '16', '9'],
      correct: 1,
    },
    {
      question: 'Who is Steve Jobs?',
      answers: [
        'CEO of Microsoft',
        'Barber in NY',
        'Movie Star',
        'CEO of Apple',
      ],
      correct: 3,
    },
  ])
  const [question, setQuestion] = useState<string>('')
  const [correctAnswer, setCorrectAnswer] = useState<string>('')
  const [option1, setOption1] = useState<string>('')
  const [tempOption, setTempOption] = useState<string>('')
  const [optionArray, setOptionArray] = useState<any>([])
  const [optionList, setOptionList] = useState<any>([])
  const router = useRouter()
  // To Display questions, ansers & options

  console.log('tempOption', tempOption)
  console.log('optionArray', optionArray)
  console.log('data', data)

  const saveQuestion = (e) => {
    e.preventDefault()
    // make sure tempOption is not empty
    if (tempOption !== '') {
      // then push the current option & reset setTempOption
      optionArray.push(tempOption)
      setTempOption('')
    }

    //  create cur obj
    const obj = {
      question: question,
      answers: optionArray,
      correct: correctAnswer,
    }
    console.log('🚀 ~ file: create.tsx:54 ~ saveQuestion ~ obj', obj)
    // push it to setData
    setData([...data, obj])
    setQuestion('')
    setOptionArray([])
    setCorrectAnswer('')
    setTempOption('')
    setOptionList([])
  }

  const onAddBtnClick = (e) => {
    // first check tempOption not empty
    if (tempOption === '') {
      alert('Option cannot be blank!')
      return
    }

    // then push the current option & reset setTempOption
    optionArray.push(tempOption)
    setTempOption('')

    // to display all options
    setOptionList(
      optionList.concat(
        <CustomeInput
          e={e}
          tempOption={tempOption}
          setTempOption={setTempOption}
          key={optionList.length}
        />,
      ),
    )
  }

  function handleClick(e) {
    e.preventDefault()
    router.push('/quest/V2zbf8iYGGGzFnkXQ6tB')
  }

  return (
    <div style={{ padding: '10rem 10rem ' }}>
      <Text className={styles.title}>Create</Text>
      <div style={{ display: 'flex' }}>
        <Box bg="gray" w="50%" p={10} color="white">
          <Text mb="8px">Question</Text>
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Here is a sample placeholder"
            size="md"
          />

          <div
            style={{ paddingLeft: '3rem', paddingTop: '.5rem', width: '80%' }}
          >
            <Text mb="8px">Correct Answer</Text>
            <Input
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              placeContent="Answer"
              size="sm"
            />
          </div>

          <div
            style={{ paddingLeft: '3rem', paddingTop: '1rem', width: '80%' }}
          >
            <Text mb="8px">Options</Text>
            <Input
              onChange={(e) => setTempOption(e.target.value)}
              placeContent="Option"
              size="sm"
            />
          </div>

          {optionList}
          <button
            onClick={onAddBtnClick}
            style={{ marginLeft: '3rem', marginTop: '0.5rem' }}
          >
            + Add Option
          </button>
          <br />
          <br />
          <button onClick={saveQuestion} style={{ marginTop: '0.5rem' }}>
            Save Question
          </button>
        </Box>

        <Box
          bg="tomato"
          w="50%"
          p={40}
          color="white"
          style={{ paddingTop: '3rem' }}
        >
          {data.length
            ? data.map((question, idx) => (
                <div
                  key={idx}
                  style={{
                    paddingBottom: '1rem',
                  }}
                >
                  <h1
                    style={{
                      color: 'white',
                      fontSize: '1.3rem',
                    }}
                  >
                    {question.question}
                  </h1>

                  {question.answers
                    ? question.answers.map((answer, idx) => (
                        <p key={idx} style={{ paddingLeft: '.5rem' }}>
                          {`${idx + 1}.-`} {answer}
                        </p>
                      ))
                    : ''}
                  {/* <p>1.- New York City</p>
                  <p>2.- New Jersey</p>
                  <p>3.- Los Angeles </p>
                  <p>4.- Paris </p> */}
                </div>
              ))
            : ''}
        </Box>
      </div>
    </div>
  )
}

export default withTransition(Create)

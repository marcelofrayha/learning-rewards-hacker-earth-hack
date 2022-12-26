import { Box, Button, useColorModeValue, Text, Input } from '@chakra-ui/react'

import { useCallback, useEffect, useMemo, useState } from 'react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import CreateContentFirstPart from '@components/CreateContentFirstPart'
import withTransition from '@components/withTransition'
import { apiKey } from '../components/APIKEYS'

const CustomeInput = ({ e, tempOption, setTempOption }) => {
  return (
    <div style={{ paddingLeft: '3rem', paddingTop: '1rem', width: '80%' }}>
      <Input
        onChange={(e) => setTempOption(e.target.value)}
        placeholder="Option"
        size="sm"
      />
    </div>
  )
}

function Create() {
  const [data, setData] = useState<any>([])
  const [showFirstPart, setShowFirstPart] = useState<boolean>(true)
  const [question, setQuestion] = useState<string>('')
  const [correctAnswer, setCorrectAnswer] = useState<string>('')
  const [option1, setOption1] = useState<string>('')
  const [tempOption, setTempOption] = useState<string>('')
  const [optionArray, setOptionArray] = useState<any>([])
  const [optionList, setOptionList] = useState<any>([])
  // First part
  const [title, setTitle] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [level, setLevel] = useState<string>('')
  const [rewardAmount, setRewardAmount] = useState<string>('')
  const [experiencePoint, setExperiencePoint] = useState<string>('')
  const router = useRouter()

  console.log(
    'A',
    title,
    image,
    description,
    level,
    rewardAmount,
    experiencePoint,
    // subscription fee

    // FE to IPFS
    // i need:
    //  - format FP &SP to an obj
    //     curObj = {

    //       image: '',
    //   title: 'Aleo Basics',
    //   description:
    //     'Aleo Basics concepts to get started in your journey with Aleo.',
    //   rewardAmount: '0.99 USDC',
    //   experiencePoint: '100LE',
    //   level,
    //   creator: 'address',
    //   id: 1,
    //   subscriptionFee: '',
    //   tempQuizArray = [obj, obj]
    //     }

    // - IPFS returns a CID
    // - To save CID into contract
    //   - call createTask(string CID, uint rewardAmount, uint subscriptionFee)
    //   - show success

    //   - redirect to All tasksPage

    //  A TASK (first part)
    // {
    //   image: '',
    //   title: 'Aleo Basics',
    //   description:
    //     'Aleo Basics concepts to get started in your journey with Aleo.',
    //   rewardAmount: '0.99 USDC',
    //   experiencePoint: '100LE',
    //   level,
    //   creator: 'address',
    //   id: 1,
    //   subscriptionFee: '',
    // },

    // SECOND PART (maybe a json obj global {})
    // const tempQuiz = [
    //   {
    //     question: 'Who is Steve Jobs?',
    //     answers: [
    //       'CEO of Microsoft',
    //       'Barber in NY',
    //       'Movie Star',
    //       'CEO of Apple',
    //     ],
    //     correct: 3,
    //   },

    // ]
  )

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

  // const saveToNFTStorage = async () => {
  //   console.log('saveToNFT')
  //   try {
  //     const obj = {
  //       category: category ? category : 'Other',
  //       location: location ? location : '123 Broadway Ave New York, NY, 10032',
  //       coverPhoto: coverPhoto
  //         ? coverPhoto
  //         : 'https://media.istockphoto.com/photos/chopping-board-picture-id89342700?k=20&m=89342700&s=170667a&w=0&h=Nh4B8kdpODYG5NwbvS75WxelOxhXlc-4UWu_ijkkmgE=',

  //       description: bio ? bio : 'Comming soon...',
  //       image: image
  //         ? image
  //         : 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1106&q=80',
  //       organizer: ownerWalletAddress
  //         ? ownerWalletAddress
  //         : '0x11760DB13aE3Aa5Bca17fC7D62172be2A2Ea9C11',
  //       targetAmmount: '1000',
  //       title: position ? position : 'Online Instructor',
  //       neighborhood: neighborhood ? neighborhood : 'Tribeca',
  //       hours: hours ? hours : 'Open Everyday',
  //     }

  //     console.log('what is obj', obj)

  //     const client = new NFTStorage({ token: apiKey })
  //     const metadata = await client.store({
  //       name: position,
  //       description: JSON.stringify(obj),
  //       image: new File([image], 'imageName', { type: 'image/*' }),
  //     })
  //     console.log('metadata', metadata)

  //     if (metadata) {
  //       console.log('metadata URL', metadata?.url)
  //       const url = metadata?.url.substring(7) //  bafyreifeiksc7pfbdex5fhes2inqdail7cvf3jfphugtpyzw4rpzte3rca/metadata.json
  //       const fullUrl = `https://cloudflare-ipfs.com/ipfs/${url}`
  //       console.log('fullUrl', fullUrl)

  //       const saveToContract = await contract.createClass(fullUrl, '1000')
  //       const tx = await saveToContract.wait()
  //       console.log('tx', tx)
  //       history.push('/')
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div style={{ padding: '10rem 10rem ' }}>
      <Text className={styles.title}>
        Create and earn rewards every time a person uses your project, quiz, or
        tutorial.*{' '}
      </Text>
      <div style={{ display: 'flex' }}>
        <Box bg="gray" w="50%" p={10} color="white" minHeight="50rem">
          {showFirstPart ? (
            <CreateContentFirstPart
              setShowFirstPart={setShowFirstPart}
              setTitle={setTitle}
              setImage={setImage}
              image={image}
              setDescription={setDescription}
              setLevel={setLevel}
              setRewardAmount={setRewardAmount}
              setExperiencePoint={setExperiencePoint}
            />
          ) : (
            <>
              {/* SECOND PART */}
              <Text mb="8px">Question</Text>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Here is a sample placeholder"
                size="md"
              />

              <div
                style={{
                  paddingLeft: '3rem',
                  paddingTop: '.5rem',
                  width: '80%',
                }}
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
                style={{
                  paddingLeft: '3rem',
                  paddingTop: '1rem',
                  width: '80%',
                }}
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
              <br />
              <br />

              <Button
                className={styles.btnBack}
                variant="outline"
                onClick={() => setShowFirstPart(true)}
              >
                Back
              </Button>
              <Button
                className={styles.savePost}
                variant="outline"
                onClick={saveQuestion}
              >
                Save All & Publish
              </Button>
            </>
          )}
        </Box>

        <Box
          bg="tomato"
          w="50%"
          p={40}
          color="white"
          style={{ paddingTop: '3rem' }}
        >
          {data.length ? (
            data.map((question, idx) => (
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
                  {`${idx + 1}.-`} {question.question}
                </h1>

                {question.answers
                  ? question.answers.map((answer, idx) => (
                      <p key={idx} style={{ paddingLeft: '.5rem' }}>
                        {`${idx + 1}.-`} {answer}
                      </p>
                    ))
                  : ''}
              </div>
            ))
          ) : (
            <h1
              style={{
                color: 'white',
                fontSize: '1.3rem',
              }}
            >
              Your content will display here!
            </h1>
          )}
        </Box>
      </div>
    </div>
  )
}

export default withTransition(Create)

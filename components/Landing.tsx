import { Button, VStack, Image, Box, Text, Spinner } from '@chakra-ui/react'
import { handleConnect } from '@utils/web3'
import { useState, useContext, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useTron } from './TronProvider'
import withTransition from './withTransition'
import { MyAppContext } from '../pages/_app'
import { ethers } from "ethers"
import { ABI } from '../abis/ABI'
import hre from 'hardhat'

function Landing() {
  const [isLoading, setLoading] = useState<boolean>(false)

  const {
    account,
    setAccount,
    contract,
    setContract,
    provider,
    setProvider,
    signer,
    setSigner,
    allTasks,
    setAllTasks,
  } = useContext(MyAppContext)

  // useEffect(() => {
  //   setN(new Date().getTime())
  // }, [])

  const connectWallet = async () => {
    if (!window.ethereum) {
      console.log('please install MetaMask')
      return
    }
    const providerTemp = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(providerTemp)
    const { chainId } = await providerTemp.getNetwork()
    console.log('here chainId', chainId)
    const deployedContract = '0xc5E2df91ff790fb46FF0A8BfFf69A2F87fC293bc'
    const signer = providerTemp.getSigner()
    setSigner(signer)

    if (chainId == '1001') {
      let tempContract = new ethers.Contract(deployedContract, ABI, signer)
      setContract(tempContract)
      getAllTasks(tempContract)
    } else {
      alert('Please connect to Klaynt Test Network!')
    }

    // MetaMask requires requesting permission to connect users accounts
    providerTemp
      .send('eth_requestAccounts', [])
      .then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
          // localStorage('currentAccount', accounts[0])
        }
      })
      .catch((e) => console.log(e))
  }

  const getAllTasks = async (contract) => {
    const allTasks = await contract.getAllTasks()
    console.log('🚀Landing.tsx:79 ~ getAllTasks ~ allTasks', allTasks)
    setAllTasks(allTasks)
  }
    
  return (
    <div className={styles.container}>
      <main className={styles.landing}>
        <VStack gap={3} zIndex={1}>
          <VStack>
            <Box w={400}>
              <Image src="/logo2.png" alt="Learning rewards" />
            </Box>
            {/* <Text className={styles.title}>N is {n} </Text> */}
            <Text className={styles.title}>
              Please connect your wallet to continue.
            </Text>
          </VStack>
          <Button
            onClick={() => connectWallet()}
            className={styles.connectButton}
          >
            MY connectWallet
          </Button>
          <Button
            onClick={() => handleConnect(setLoading, setAddress, provider)}
            className={styles.connectButton}
          >
            {isLoading ? <Spinner color="white" /> : 'Connect Wallet'}
          </Button>
        </VStack>
        <Box className={styles.ellipseOne}></Box>
      </main>
    </div>
  )
}

export default withTransition(Landing)

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
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEthers } from "@usedapp/core"

const injected = new InjectedConnector({ supportedChainIds: [1, 4, 1001] });


const getEthereumObject = () => window.ethereum;

/*
 * This function returns the first linked account found.
 * If there is no account linked, it will return null.
 */
const findAccount = async () => {
  try {
    const ethereum = getEthereumObject();

    /*
    * First make sure we have access to the Ethereum object.
    */
    if (!ethereum) {
      console.error("Make sure you have Metamask!");
      return null;
    }

    console.log("We have the Ethereum object", ethereum);
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      return account;
    } else {
      console.error("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

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

  /*
   * The passed callback function will be run when the page loads.
   * More technically, when the App component "mounts".
   */

  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        alert("Get a Wallet!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
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
  };

  useEffect(() => {
    findAccount().then((account) => {
      if (account !== null) {
        setAccount(account);
      }
    });
  }, []);

  const { activate } = useEthers();

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected);
      }
    });
  }, [activate]); 

  

  // useEffect(() => {
  //   setN(new Date().getTime())
  // }, [])

  // const connectWallet = async () => {
  //   if (!window.ethereum) {
  //     console.log('please install MetaMask')
  //     return
  //   }
  //   const providerTemp = new ethers.providers.Web3Provider(window.ethereum)
  //   setProvider(providerTemp)
  //   const { chainId } = await providerTemp.getNetwork()
  //   console.log('here chainId', chainId)
  //   const deployedContract = '0xc5E2df91ff790fb46FF0A8BfFf69A2F87fC293bc'
  //   const signer = providerTemp.getSigner()
  //   setSigner(signer)

  //   if (chainId == '1001') {
  //     let tempContract = new ethers.Contract(deployedContract, ABI, signer)
  //     setContract(tempContract)
  //     getAllTasks(tempContract)
  //   } else {
  //     alert('Please connect to Klaynt Test Network!')
  //   }

  //   // MetaMask requires requesting permission to connect users accounts
  //   providerTemp
  //     .send('eth_requestAccounts', [])
  //     .then((accounts) => {
  //       if (accounts.length > 0) {
  //         setAccount(accounts[0])
  //         // localStorage('currentAccount', accounts[0])
  //       }
  //     })
  //     .catch((e) => console.log(e))
  // }

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

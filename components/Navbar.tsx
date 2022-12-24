import Link from 'next/link'
import styles from '@styles/Navbar.module.css'
import { Button, HStack, Image, Spinner, Text, VStack } from '@chakra-ui/react'
import { useTron } from './TronProvider'
import { abridgeAddress } from '@utils/abridgeAddress'
import { useState } from 'react'
import { handleDisconnect } from '@utils/web3'
import { useRouter } from 'next/router'

const Navbar = () => {
  const { address, setAddress } = useTron()
  const router = useRouter()
  const [isHover, setIsHover] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)

  if (!address) return

  function handleNavigate() {
    router.push('/')
  }

  return (
    <HStack className={styles.navbarContainer}>
      <VStack w="100%">
        <HStack className={styles.navbar}>
          <Link href="/">
            <Image
              src="/logo2.png"
              alt="Logo"
              cursor="pointer"
              className={styles.logo}
            ></Image>
          </Link>
          <HStack className={styles.navLeftSection}>
            <Link href="/tasks">
              <Text>Tasks</Text>
            </Link>
            <Link href="/create">
              <Text>Create Tasks</Text>
            </Link>
            <Link href="/profile">
              <Text>My Profile</Text>
            </Link>
            <Link href="/community">
              <Text>Community</Text>
            </Link>
            {/* <Link href="/partners">
          <Text>Partners</Text>
        </Link>  */}
            {address && (
              <Button
                className={styles.addressPill}
                onClick={() =>
                  handleDisconnect(setLoading, setAddress, handleNavigate)
                }
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                {isLoading ? (
                  <Spinner color="white" />
                ) : isHover ? (
                  'Disconnect'
                ) : (
                  abridgeAddress(address)
                )}
              </Button>
            )}
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  )
}

export default Navbar

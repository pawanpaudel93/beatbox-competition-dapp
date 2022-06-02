import { useAuthentication } from '../context/AuthenticationContext'
import { ReactNode, useMemo } from 'react'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Center,
  useColorMode,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'

interface NavItem {
  key: number
  label: string
  href?: string
}

const NavItems: Array<NavItem> = [
  {
    key: 0,
    label: 'Create Competition',
    href: '/create-competition',
  },
  {
    key: 1,
    label: 'Competitions',
    href: '/competitions',
  },
  {
    key: 2,
    label: 'My Competitions',
    href: '/my-competitions',
  },
]

const Logo = (props: any) => {
  return (
    <svg
      height={32}
      viewBox="0 0 35 28"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ display: 'inline' }}
    >
      <image xlinkHref="/logo.png" height="32" />
    </svg>
  )
}

const NavLink = ({ children, href }: { children: ReactNode; href: string }) => (
  <NextLink href={href} passHref>
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      {children}
    </Link>
  </NextLink>
)

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { signin, signout, user, isAuthenticated, isAuthenticating } =
    useAuthentication()

  const shorterAddress = useMemo(() => {
    const address = user?.get('ethAddress')
    if (!address) return ''
    return address.slice(0, 8) + '...' + address.slice(-8)
  }, [user?.get('ethAddress')])

  return (
    <>
      <Flex as="header" position="fixed" w="100%" top={0} zIndex={1000}>
        <Box w="100%" bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
              <NextLink href="/" passHref>
                <Box cursor="pointer">
                  <Logo /> <b>Beatbox Competition</b>
                </Box>
              </NextLink>

              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}
              >
                {NavItems.map((navItem) => (
                  <NavLink key={navItem.key} href={navItem.href as string}>
                    {navItem.label}
                  </NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={3}>
                <Button onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
                {!isAuthenticated ? (
                  <Button
                    display={{ base: 'none', md: 'inline-flex' }}
                    fontSize={'sm'}
                    fontWeight={600}
                    color={'white'}
                    bg={'blue.400'}
                    _hover={{
                      bg: 'blue.300',
                    }}
                    onClick={signin}
                    disabled={isAuthenticating}
                  >
                    Sign In
                  </Button>
                ) : (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}
                    >
                      <Avatar
                        size={'sm'}
                        src={`https://avatars.dicebear.com/api/pixel-art/${shorterAddress}.svg`}
                      />
                    </MenuButton>
                    <MenuList alignItems={'center'}>
                      <br />
                      <Center>
                        <Avatar
                          size={'xl'}
                          src={`https://avatars.dicebear.com/api/pixel-art/${shorterAddress}.svg`}
                        />
                      </Center>
                      <br />
                      <Center>
                        <p>{shorterAddress}</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem
                        justifyContent="center"
                        onClick={signout}
                      >
                        Sign Out
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </Stack>
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {NavItems.map((navItem) => (
                  <NavLink key={navItem.key} href={navItem.href as string}>
                    {navItem.label}
                  </NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
      </Flex>
    </>
  )
}

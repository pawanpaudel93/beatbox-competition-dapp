import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import NextLink from 'next/link'

const Home: NextPage = () => {
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}
            >
              Online
            </Text>
            <br />{' '}
            <Text color={'blue.400'} as={'span'}>
              Beatbox Competition
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            This dApp is a proof of concept for a decentralized online beatbox
            competition.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <NextLink href="/create-competition" passHref>
              <Button
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Create Competition
              </Button>
            </NextLink>
            <NextLink href="/how-it-works" passHref>
              <Button rounded={'full'}>How It Works</Button>
            </NextLink>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={'Login Image'} objectFit={'cover'} src={'/logo.png'} />
      </Flex>
    </Stack>
  )
}

export default Home

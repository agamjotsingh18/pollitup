import {
  Box,
  Stack,
  HStack,
  VStack,
  Link,
  Divider,
  Image,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { FiTwitter } from 'react-icons/fi';
import { Link as RLink } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.900');

  return (
    <Box as="footer" bg={bgColor} py={8} px={4}>
      <Stack
        spacing={{ base: 8, md: 0 }}
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'center', md: 'unset' }}
        justifyContent={{ base: 'center', md: 'space-between' }} // Added justifyContent property
      >
        <Box maxW="100%" mr={20}>
          <Image w="100px" src={logo} alt="PollitUp" />
        </Box>
        <VStack spacing={4} align="flex-start" flexGrow={1} >
          <Text fontSize="md" fontWeight="bold">
            Sitemap
          </Text>
          <VStack spacing={2} align="flex-start" color="gray.500">
            <Link as={RLink} to="#">
              Home
            </Link>
            <Link as={RLink} to="/discover">
              Discover
            </Link>
            <Link as={RLink} to="/testimonials">
              Testimonials
            </Link>
          </VStack>
        </VStack>
        <VStack spacing={4} align="flex-start" flexGrow={1} ml="auto">
          <Text fontSize="md" fontWeight="bold">
            Log In/Sign Up
          </Text>
          <VStack spacing={2} align="flex-start" color="gray.500">
            <Link as={RLink} to="/login">
              Log In
            </Link>
            <Link as={RLink} to="/resgister">
              Register
            </Link>
          </VStack>
        </VStack>
        <Stack spacing={2} direction={{ base: 'column', md: 'row' }}>
          <Button
            leftIcon={<FaGithub />}
            as={Link}
            href="https://github.com/agamjotsingh18/pollitup.github.io"
            target="_blank"
            rounded="md"
            colorScheme="purple"
            color="white"
            cursor="pointer"
            _hover={{ textDecoration: 'none' }}
          >
            Follow on Github
          </Button>
        </Stack>
      </Stack>

      <Divider my={4} />

      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={3}
        justify="center" // Updated justify property to center align
        align="center"
      >
        <Text fontSize="md" alignSelf="flex-end">
          &copy; {new Date().getFullYear()} PollItUp - All Rights Reserved
        </Text>
        <Text fontSize="md" alignSelf="flex-end">
          Made with ❤️ by Agamjot
          <Link
            href="https://github.com/MA-Ahmad"
            textDecoration="underline"
            _hover={{ textDecoration: 'none' }}
          >
          </Link>
        </Text>
      </Stack>
    </Box>
  );
};

export default Footer;

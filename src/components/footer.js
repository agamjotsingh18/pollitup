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
  useColorMode,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { FiTwitter } from 'react-icons/fi';
import { Link as RLink } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const buttonColorScheme = colorMode === 'light' ? 'purple' : 'blue';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box as="footer" bg={bgColor} py={8} px={4}>
      <Stack
        spacing={{ base: 8, md: 0 }}
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'center', md: 'unset' }}
        justifyContent={{ base: 'center', md: 'space-between' }}
      >
        <Box maxW="100%" mr={20}>
          <Image w="100px" src={logo} alt="PollitUp" />
        </Box>
        <VStack spacing={4} align="flex-start" flexGrow={1}>
          <Text fontSize="md" fontWeight="bold" color="gray.600">
            Sitemap
          </Text>
          <VStack spacing={2} align="flex-start" color="gray.500">
            <Link
              as={RLink}
              to="#"
              color="blue.600"
              onClick={scrollToTop}
              _hover={{ textDecoration: 'none', transform: 'scale(1.05)' }}
            >
              Home
            </Link>
            <Link
              as={RLink}
              to="/discover"
              color="blue.600"
              _hover={{ textDecoration: 'none', transform: 'scale(1.05)' }}
            >
              Discover
            </Link>
            <Link
              as={RLink}
              to="/testimonials"
              color="blue.600"
              _hover={{ textDecoration: 'none', transform: 'scale(1.05)' }}
            >
              Testimonials
            </Link>
          </VStack>
        </VStack>
        <VStack spacing={4} align="flex-start" flexGrow={1} ml="auto">
          <Text fontSize="md" fontWeight="bold" color="gray.600">
            Log In/Sign Up
          </Text>
          <VStack spacing={2} align="flex-start" color="gray.500">
            <Link
              as={RLink}
              to="/login"
              color="blue.600"
              _hover={{ textDecoration: 'none', transform: 'scale(1.05)' }}
            >
              Log In
            </Link>
            <Link
              as={RLink}
              to="/register"
              color="blue.600"
              _hover={{ textDecoration: 'none', transform: 'scale(1.05)' }}
            >
              Register
            </Link>
          </VStack>
        </VStack>
        <VStack spacing={2} direction={{ base: 'column', md: 'row' }}>
          <Button
            leftIcon={<FaGithub />}
            as={Link}
            href="https://github.com/agamjotsingh18/pollitup.github.io"
            target="_blank"
            rounded="md"
            colorScheme={buttonColorScheme}
            color={colorMode === 'light' ? 'white' : 'gray.800'}
            cursor="pointer"
            _hover={{
              textDecoration: 'none',
              transform: 'scale(1.05)',
              transition: 'transform 0.3s ease',
            }}
          >
            Follow on Github
          </Button>
          <Text
            fontSize="md"
            alignSelf="center"
            py={8}
          >
            &copy; {new Date().getFullYear()} PollItUp - All Rights Reserved
          </Text>
        </VStack>
      </Stack>

      <Divider my={6} borderColor="gray.300" />

      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={3}
        justify="center"
        align="center"
        color="gray.600"
      >
        <Text fontSize="md" alignSelf="center">
          Made with ❤️ by{' '}
          <Link
            href="https://github.com/agamjotsingh18"
            textDecoration="underline"
            _hover={{
              textDecoration: 'none',
              transform: 'scale(1.05)',
              transition: 'transform 0.3s ease',
            }}
          >
            Agamjot
          </Link>
        </Text>
      </Stack>
    </Box>
  );
};

export default Footer;

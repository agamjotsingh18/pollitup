import {
  Box,
  Stack,
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
import { Link as RLink, useLocation, useHistory } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const buttonColorScheme = colorMode === 'light' ? 'purple' : 'blue';
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const location = useLocation();
  const history = useHistory();
  const isHomePage = location.pathname === '/';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    if (isHomePage) {
      scrollToTop();
    } else {
      history.push('/');
      scrollToTop();
    }
  };

  const handleLinkClick = () => {
    scrollToTop();
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
          <Text fontSize="md" fontWeight="bold" color={textColor}>
            Sitemap
          </Text>
          <VStack spacing={2} align="flex-start" color="gray.500">
            <Link
              as={RLink}
              to="#"
              color="blue.600"
              onClick={handleHomeClick}
              _hover={{ textDecoration: 'none', transform: 'scale(1.05)' }}
              _focus={{
                outline: 'none',
              }}
            >
              Home
            </Link>
            <Link
              as={RLink}
              to="/discover"
              onClick={handleLinkClick}
              color="blue.600"
              _hover={{ textDecoration: 'none', transform: 'scale(1.05)' }}
              _focus={{
                outline: 'none',
              }}
            >
              Discover
            </Link>
            <Link
              as={RLink}
              to="/testimonials"
              color="blue.600"
              onClick={handleLinkClick}
              _hover={{ textDecoration: 'none', transform: 'scale(1.05)' }}
              _focus={{
                outline: 'none',
              }}
            >
              Testimonials
            </Link>
          </VStack>
        </VStack>
        <VStack spacing={4} align="flex-start" flexGrow={1} ml="auto">
          <Text fontSize="md" fontWeight="bold" color={textColor}>
            Log In/Sign Up
          </Text>
          <VStack spacing={2} align="flex-start" color="gray.500">
            <Link
              as={RLink}
              to="/login"
              color="blue.600"
              onClick={handleLinkClick}
              _hover={{ textDecoration: 'none', transform: 'scale(1.05)' }}
              _focus={{
                outline: 'none',
              }}
            >
              Log In
            </Link>
            <Link
              as={RLink}
              to="/register"
              color="blue.600"
              onClick={handleLinkClick}
              _hover={{ textDecoration: 'none', transform: 'scale(1.05)' }}
              _focus={{
                outline: 'none',
              }}
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
            _focus={{
              outline: 'none',
            }}
          >
            Follow on Github
          </Button>
          <Text fontSize="md" alignSelf="center" py={8} color={textColor}>
            &copy; {new Date().getFullYear()} PollItUp - All Rights Reserved
          </Text>
        </VStack>
      </Stack>

      <Divider borderColor="gray.300" />

      {/* <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={3}
        justify="center"
        align="center"
        color={textColor}
      >
        <Text fontSize="md" alignSelf="center">
          Made with ❤️ by{' '}
          <Link
            target="_blank"
            href="https://github.com/agamjotsingh18"
            textDecoration="underline"
            _hover={{
              textDecoration: 'none',
              transform: 'scale(1.05)',
              transition: 'transform 0.3s ease',
            }}
            _focus={{
              outline: 'none',
            }}
          >
            Agamjot
          </Link>
        </Text>
      </Stack> */}
    </Box>
  );
};

export default Footer;
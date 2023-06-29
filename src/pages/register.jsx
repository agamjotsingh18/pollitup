import React from 'react';

import initFirebase from '../lib/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuth } from '../lib/auth';
//import { addDoc, getDoc } from '../lib/db';

import { RegisterForm } from "../components/registerForm";
import { DividerWithText } from '../components/dividerWithText';
import { FaGoogle } from 'react-icons/fa';

import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  useColorModeValue as mode,
  VisuallyHidden,
  useToast,
} from '@chakra-ui/react';
import Link from '../components/link';

export default function RegisterPage() {
  initFirebase();
  const toast = useToast();
  const { user, loadingUser } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  React.useEffect(() => {
    if (user && !loadingUser) window.location.href = '/';
  }, [user, loadingUser]);

  async function signUp() {
    if (password !== password2) {
      return toast({
        title: "Error",
        description: "Passwords do not match!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((u) => { // u.user.uid
      window.location.href = '/';
    })
    .catch(function(err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });
  }

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithRedirect(provider)
    .then((u) => { // u.user.uid
      window.location.href = '/';
    })
    .catch(function(err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });;
  }

  if (!loadingUser && !user) return (
    <Container maxW="container.sm" p={8}>
      <Box bg={mode('gray.50', 'inherit')} minH="100vh" py="12" px={{ sm: '6', lg: '8' }}>
        <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} w={{ sm: 'full' }}>
          <Heading mt="6" textAlign="center" size="xl" fontWeight="extrabold">
            Register an account
          </Heading>
          <Text mt="4" align="center" maxW="md" fontWeight="medium">
            <span>Already have an account?</span>
            <Box
              as="a"
              marginStart="1"
              href="#"
              color={mode('blue.600', 'blue.200')}
              _hover={{ color: 'blue.600' }}
              display={{ base: 'block', sm: 'revert' }}
            >
              <Link href="/login" color="brand.500">Login</Link>
            </Box>
          </Text>
        </Box>
        <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} mt="8" w={{ sm: 'full' }}>
          <Box
            bg={mode('white', 'gray.700')}
            py="8"
            px={{ base: '4', md: '10' }}
            shadow="base"
            rounded={{ sm: 'lg' }}
          >
            <RegisterForm email={email} setEmail={setEmail} signUp={signUp} password={password} setPassword={setPassword} password2={password2} setPassword2={setPassword2}/>
            <DividerWithText mt="6">or continue with</DividerWithText>
            <SimpleGrid mt="6" columns={1} spacing="3">
              <Button onClick={signInWithGoogle} color="currentColor" variant="outline">
                <VisuallyHidden>Sign up with Google</VisuallyHidden>
                <FaGoogle/>
              </Button>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </Container>
  );
  
  // Prevents flashing page when logged in
  return (<></>); // TODO: add loading page
}
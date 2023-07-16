import React from 'react';

import initFirebase from '../lib/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';


import {
  Container,
  Box,
  Heading,
  Text,
  useColorModeValue as mode,
  useToast,
} from '@chakra-ui/react';
import EmailRequestForm from '../components/emailRequestForm';


function ForgotPassEmail() {
  const toast = useToast();
	function handleResetPassword(email) {
    initFirebase();
    const auth = firebase.auth();
    auth.sendPasswordResetEmail(email).then(function() {
      // Email sent.
      toast({
        title: "Email Sent",
        description: "Check your email for a link to reset your password.",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    }).catch(function(error) {
      // An error happened.
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      })
      
    });
	}
	return (
		
<Container maxW="container.sm" p={8}>
      <Box bg={mode('gray.50', 'inherit')} minH="100vh" py="12" px={{ sm: '6', lg: '8' }}>
        <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} w={{ sm: 'full' }}>
          <Heading mt="6" textAlign="center" size="xl" fontWeight="extrabold">
           Password Reset 
          </Heading>
          <Text mt="4" align="center" maxW="md" fontWeight="medium">
            <span>Enter the Email associated with your account </span>
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
            <EmailRequestForm handleResetPassword={handleResetPassword} />
          </Box>
        </Box>
      </Box>
    </Container>

	)
}

export default ForgotPassEmail;

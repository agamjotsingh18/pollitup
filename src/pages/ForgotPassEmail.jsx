import React from 'react';

import initFirebase from '../lib/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuth } from '../lib/auth';
import { addDoc, getDoc } from '../lib/db';

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
import EmailRequestForm from '../components/emailRequestForm';

function ForgotPassEmail() {
	function handleResetPassword() {
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

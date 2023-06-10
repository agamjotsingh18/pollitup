import React from 'react';

import 'firebase/auth';


import {
  Container,
  Box,
  Heading,
  Text,
  useColorModeValue as mode,
  Image,
  Center
} from '@chakra-ui/react';

function EmailSentPage() {
	function handleResetPassword() {
		console.log("reset password");
		window.location.href = "/emailSent";
	}
	return (
<Container >
		
      <Box bg={mode('gray.50', 'inherit')} minH="100vh" py="12" px={{ sm: '6', lg: '8' }}>
        <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} w={{ sm: 'full' }}>
          <Heading mt="6" textAlign="center" size="xl" fontWeight="extrabold">
           Password Reset 
          </Heading>
        </Box>
	<Center>
		<Image src="./icons/done-icon.svg" alt="logo" boxSize="20vh" my="4" />
	</Center>
        <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} mt="8" w={{ sm: 'full' }}>
          <Box
            bg={mode('white', 'gray.700')}
            py="8"
            px={{ base: '4', md: '10' }}
            shadow="base"
            rounded={{ sm: 'lg' }}
          >
            <Text align="center" maxW="md" fontWeight="medium"> A email with password reset link has been sent </Text>
          </Box>
        </Box>
      </Box>
    </Container>
	)
}

export default EmailSentPage;

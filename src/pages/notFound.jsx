import React from 'react';
import { Container, Flex, Stack, Text, Button } from '@chakra-ui/react';
import { Link as RLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={20}
      >
        <Text color={'gray.500'} maxW={'3xl'}>
          UH OH! You're lost.
        </Text>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png"
          alt="404"
          width={300}
        />
        <Text color={'gray.500'} maxW={'lg'}>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Button px={6} colorScheme="blue" size="md" as={RLink} to="/">
            Return Home
          </Button>
        </Stack>
        <Flex w={'full'}></Flex>
      </Stack>
    </Container>
  );
}

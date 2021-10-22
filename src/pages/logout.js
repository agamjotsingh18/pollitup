import React from 'react';

import firebase from 'firebase/app';

import {
  Container,
  Text,
  Center,
} from '@chakra-ui/react';

export default function LogoutPage() {
  React.useEffect(() => {
    signOut();
  }, []);

  async function signOut() {
    await firebase.auth().signOut();
    window.location.href = '/';
  }

  return (
    <Container maxW="container.sm" p={8}>
      <Center>
        <Text>Logging out...</Text>
      </Center>
    </Container>
  );
}
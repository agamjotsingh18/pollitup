import React from 'react'
import {
    Container,
    Center,
    Text,
} from "@chakra-ui/react";

export default function NotFound() {
    return (
      <Container maxW="container.sm" p={8}>
        <Center>
          <Text>404 - Not found</Text>
        </Center>
      </Container>
    )
}

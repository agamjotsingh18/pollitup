import React from 'react';
//import { Link as RLink } from 'react-router-dom';

import {
  Flex,
  Stack,
  Text,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react';

import ColorModeToggle from './colorModeToggle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function FooterComponent() {
  return (
    <Flex p={4}  as="footer"
      justify="space-between" direction={{ base: "column", md: "row" }}
      bg="brand.800" color="white"
    >
      <Flex align="center" direction={{ base: "column", md: "row" }}>
        <Text m={2} color="gray.400">&copy; 2021 PollItUp</Text>
        <Stack m={2} spacing={3} direction="row" align="center">
          {/*<RLink to="/contact">Contact us</RLink>
          <RLink to="/reportissue">Report an issue</RLink>*/}
        </Stack>
      </Flex>
      <Stack m={2} spacing={4} direction="row" justify="center" align="center">
        <ColorModeToggle color={useColorModeValue("brand.700", "white")}/>
        <ChakraLink href="https://github.com/agamjotsingh18/pollitup.github.io" target="_blank">
          <FontAwesomeIcon icon={faGithub}/>
        </ChakraLink>
      </Stack>
    </Flex>
  )
}
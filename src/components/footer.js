import React from 'react';
//import { Link as RLink } from 'react-router-dom';

import {
  Flex,
  Stack,
  Text,
  Link as ChakraLink,

} from '@chakra-ui/react';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function FooterComponent() {
  return (
    <Flex p={4} as="footer" bg="brand.800" color="white">
      <Flex align="center" justify="center" direction="column">
        <Text m={2} color="white" letterSpacing={1}>Made with ❤️ by Agamjot</Text>
        <Stack m={2} spacing={3} direction="row" align="center"></Stack>
      </Flex>
      <Flex as="footer-2">
        <Flex>  
          <Text m={2} color="gray.400">&copy; {new Date().getFullYear()} PollItUp - All Rights Reserved</Text>
          <Stack m={2} spacing={3} direction="row" align="center">
              {/* <RLink to="/contact">Contact us</RLink>
              <RLink to="/reportissue">Report an issue</RLink> */}
          </Stack>  
        </Flex>
        <Flex as="footer-socioicon">
          <Stack m={2} spacing={4} direction="row" justify="center" align="center">

            <ChakraLink href="https://github.com/agamjotsingh18/pollitup.github.io" target="_blank">
              <FontAwesomeIcon icon={faGithub} />
            </ChakraLink>
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  )
}

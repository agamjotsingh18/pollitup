import React from 'react';
//import { Link as RLink } from 'react-router-dom';

import {
  Box, Button, FormControl, Input, Textarea,
  Grid, GridItem,
  Flex,
  Stack,
  Text,
  Heading,
  Link as ChakraLink,
  position,

} from '@chakra-ui/react';
import logo from '../assets/logo.png';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function FooterComponent() {
  return (
    <Flex p={4} as="footer" bg="brand.800" color="white" height={300}>
      <Flex as="footer-2">
        <Flex as="footer-copyright">  
          <Text m={2} color="gray.400">&copy; {new Date().getFullYear()} PollItUp - All Rights Reserved</Text>
          <Stack m={2} spacing={3} direction="row" align="center">
              {/* <RLink to="/contact">Contact us</RLink>
              <RLink to="/reportissue">Report an issue</RLink> */}
          </Stack>  
        </Flex>
        <Flex as="footer-socio">
          <Grid templateColumns='1fr 1fr 1fr 1fr 2fr' templateRows='repeat(2, 1fr)' gap={50}>
            <GridItem w='100%' h='10'>
              <Box>
                <img style={{width: "230px", position: "absolute", left: "50px", bottom:"150px"}} src={logo} alt="logo"></img>
              </Box>
            </GridItem>
            <GridItem w='100%' h='10'>
              <Heading as='h4' size='sm' mb={3}>
                <Text justify="center" align="center">Address</Text>
              </Heading>
              <Text justify="center" align="center " mb={1} letterSpacing={1} style={{fontSize:'14px', fontFamily: "Open Sans, sans-serif"}}>XYZ@gmail.com</Text>
              <Text justify="center" align="center " mb={1} letterSpacing={1} style={{fontSize:'14px', fontFamily: "Open Sans, sans-serif"}}>XYZ@gmail.com</Text>
              <Text justify="center" align="center " mb={1} letterSpacing={1} style={{fontSize:'14px', fontFamily: "Open Sans, sans-serif"}}>XYZ@gmail.com</Text>
            </GridItem>
            <GridItem w='100%' h='10'>
              <Heading as='h4' size='sm' mb={3}>
                <Text justify="center" align="center">Links</Text>
              </Heading>
              <Text justify="center" align="center " mb={1} letterSpacing={1} style={{fontSize:'14px', fontFamily: "Open Sans, sans-serif"}}>F.A.Q</Text>
              <Text justify="center" align="center " mb={1} letterSpacing={1} style={{fontSize:'14px', fontFamily: "Open Sans, sans-serif"}}>Cookies Policy</Text>
              <Text justify="center" align="center " mb={1} letterSpacing={1} style={{fontSize:'14px', fontFamily: "Open Sans, sans-serif"}}>Terms of Service</Text>
              <Text justify="center" align="center " mb={1} letterSpacing={1} style={{fontSize:'14px', fontFamily: "Open Sans, sans-serif"}}>Support</Text>
            </GridItem>
            <GridItem w='100%' h='10'>
              <Heading as='h4' size='sm'>
                <Text justify="center" align="center">Follow Us</Text>
              </Heading>             
              <Stack m={2} spacing={4} justify="center" align="center">
                <ChakraLink href="https://github.com/agamjotsingh18/pollitup.github.io" target="_blank">
                  <FontAwesomeIcon icon={faGithub} />
                </ChakraLink>
              </Stack>
            </GridItem>
            <GridItem w='100%' pl='2' rowSpan={2} >
              <Flex as="contact-form">
                <Text m={2} color="white" letterSpacing={1} textAlign="center">Contact Us</Text>
                <FormControl>
                  <Input placeholder='Name' size='md' htmlSize={45} mb={1} variant='filled'/>
                </FormControl>
                <FormControl>
                  <Input placeholder="Email" size='md' mb={1} variant='filled'/>
                </FormControl>
                <FormControl>
                  <Box>
                    <Textarea
                      placeholder="Enter your message"
                      size="md"
                      resize="vertical"
                      mb={1}
                      variant='filled'
                    />
                  </Box>
                </FormControl>
                <Button colorScheme='teal' size='md' variant='outline' width='450px'>
                  <Text textAlign="center">Submit</Text>
                </Button>
              </Flex>
            </GridItem>
          </Grid>
        </Flex>
      </Flex>
    </Flex>
  )
}

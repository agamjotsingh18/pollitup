import React from 'react';
import { Link as RLink } from 'react-router-dom';
import {
    Box,
    Container,
    SimpleGrid,
    Heading,
    Button,
    Text,
    Image,
    Center,
    Link as ChakraLink,
} from '@chakra-ui/react';
//import { DownloadIcon } from '@chakra-ui/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function homePage(){
    return (
        <>
            <Box py={20} px={10}
                textAlign="center"
            >
                <Heading as="h1" size="2xl" m={2}>Poll It Up</Heading>
                <Heading as="h2" size="lg" fontWeight="normal">
                    A community polling app with unlimited potential
                </Heading>
                <RLink to="/discover">
                    <Button my={8} colorScheme="blue" size="lg">Start discovering today</Button>
                </RLink>
            </Box>

            <Container maxW="container.lg" p={12}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
                <Box>
                    <Center>
                        <Image m={4} src='/images/create.svg' alt="create" h={48}/>
                    </Center>
                    <Heading as="h3" size="lg" my={2}>For everyone, and anyone.</Heading>
                    <Text fontSize="lg">
                        Teachers, members of the government, and even concerned citizens can launch polls about problems they are facing to get opinions on the best method to approach the problem. Or, anyone can create polls just for fun!
                    </Text>
                </Box>
                <Box>
                    <Center>
                        <Image m={4} src='/images/options.svg' alt="create" h={48}/>
                    </Center>
                    <Heading as="h3" size="lg" my={2}>Customized and relevant.</Heading>
                    <Text fontSize="lg">
                        The community can pick and choose which polls are most important for them, this can allow the community to prioritize the most urgent polls that could potentially cause drastic reforms.
                    </Text>
                </Box>
                <Box>
                    <Center>
                        <Image m={4} src='/images/map.svg' alt="create" h={48}/>
                    </Center>
                    <Heading as="h3" size="lg" my={2}>Built with community values in mind.</Heading>
                    <Text fontSize="lg">
                    Easily find polls near you, with an interactive map. You can answer polls related to problems that are arising in your community that can help better the environment, aid in the growth of local startups, allow you to share your ideas with your local government, and so much more!
                    </Text>
                </Box>
                <Box>
                    <Center>
                        <Image m={4} src='/images/pwa.svg' alt="create" h={48}/>
                    </Center>
                    <Heading as="h3" size="lg" my={2}>Use Poll It Up anywhere!</Heading>
                    <Text fontSize="lg">
                        Poll It Up is PWA optimized, so you can download it and run it as if it were a native app!
                    </Text>
                </Box>
                </SimpleGrid>
            </Container>

            {/* <Container maxW="container.lg" p={12}>
                <Heading as="h2" size="xl" my={2}
                    color="brand.500"
                >Get the app</Heading>
                <Text fontSize="lg">
                Download (or use the web version) Poll It Up today and create and answer polls to help your community.
                </Text>
                <Button colorScheme="blue" variant="solid" my={4} leftIcon={<DownloadIcon />}>Download for mobile/desktop</Button>
            </Container> */}

            <Container maxW="container.lg" p={12}>
                <Heading as="h2" size="xl" my={2}
                >Open source!</Heading>
                <Text fontSize="lg">
                Our source code is open to the public.
                </Text>
                <ChakraLink href="https://github.com/agamjotsingh18/pollitup.github.io" target="_blank" style={{ textDecoration: 'none' }}>
                    <Button colorScheme="gray" variant="solid" my={4} leftIcon={<FontAwesomeIcon icon={faGithub}/>}>GitHub repo</Button>
                </ChakraLink>
            </Container>
        </>
    )
}
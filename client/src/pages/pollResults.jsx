import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import { 
    Box, 
    useToast,
    Heading,
    Text,
    Container,
    Stack,
    Center,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Map, Marker } from 'pigeon-maps';

import initFirebase from '../lib/firebase';
import 'firebase/auth';
import { useAuth } from '../lib/auth';
import { getDoc, getUserFromRef, getSubCol, deleteDoc } from '../lib/db';

export default function PollResults(){
    initFirebase();
    const { user, loadingUser } = useAuth();

    const { id } = useParams();
    const toast = useToast();
    const pollHasVotes = false;
    const [poll, setPoll] = React.useState(false);
    const [author, setAuthor] = React.useState(false);
    const [responses, setResponses] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [isOwner, setIsOwner] = React.useState(false);
    const getProvider = (x, y, z) => `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}.png`;

    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

    React.useEffect(() => {
        async function getInfo(){
            let pollData;
            try{
                pollData = await getDoc('polls', id);
                const userData = await getUserFromRef(pollData.author);
                setPoll(pollData);
                setAuthor(userData);

                if (user && !loadingUser && user.uid === userData.id) {
                    setIsOwner(true);
                }
            }
            catch {
                await toast({
                    title: "Error",
                    description: "Poll does not exist!",
                    status: "error",
                    isClosable: true
                });
            }

            /* try{ */
            const responsesData = await getSubCol("polls", id, "responses");
            setResponses(responsesData);
            if (pollData?.type === "multipleChoice"){
                let choices = [...pollData.choices];
                var data = [];
                for (let i=0; i < choices.length; i++){
                    data.push(0);
                }
                responsesData.forEach((res) => {
                    for (let i=0; i < res.answer.length; i++){
                        data[i] += res.answer[i] ? 1 : 0;
                    }
                })
                setData(data);
            }
        }
        getInfo();
    }, [id, toast, user, loadingUser]);

    async function deletePoll() {
        await deleteDoc('polls', id);
        window.location.href = "/";
    }

    return(author ? (
        <Container maxW="container.sm">
            <Heading as="h1" m={12} align="center">Poll Info</Heading>
            <Stack direction="column" spacing={8} mb={8}>
                <Box p={4} borderWidth="1px" borderRadius="lg" lineHeight={2}>
                    <Text>Name: {poll.name}</Text> 
                    <Text>Author: <Link style = {{color: "#3182ce"}} to={"/profile/" + author.id}>{author.displayName + " (Click to view profile)"}</Link></Text>
                    <Text>Description: {poll.description}</Text> 
                    <Text>Responses: {responses.length} </Text> 
                    {pollHasVotes && <Text>Poll votes: {2}</Text>}
                </Box>
                <Box p={8} borderWidth="1px" borderRadius="lg">
                    <Heading as="h2" size="md" mb={4} align="center">Responses</Heading>
                    <Box>
                        {poll.type === 'multipleChoice' ?
                            <Doughnut
                                data={{
                                    labels: [...poll.choices],
                                    datasets: [{data:data, backgroundColor: ['red', 'blue', 'orange']}]
                                }}
                                options={{ maintainAspectRatio: false }}
                            />
                        :
                            <Stack direction="column" spacing={2} maxH="100vh" overflow="auto">
                                {responses.map(res =>
                                    <Box m={1} py={4} px={6} borderWidth="1px" borderRadius="lg">
                                        {res.answer}
                                    </Box>
                                )}
                            </Stack>
                        }
                    </Box>
                </Box>
                <Box borderWidth="1px" borderRadius="lg" h="40vh">
                    <Map defaultCenter={[poll.location._lat, poll.location._long]} defaultZoom={12} width="100%" height="100%" provider={getProvider}>
                        <Marker anchor={[poll.location._lat, poll.location._long]}  width={50} height={50} />
                    </Map>
                </Box>
                {isOwner &&
                    <>
                        <Box align="center">
                            <Heading as="h2" size="md">Poll Settings</Heading>
                            <Text mb={4}>(Only you, as the poll author, can see this)</Text>
                            <Button colorScheme="red" leftIcon={<DeleteIcon/>} onClick={() => setDeleteModalOpen(true)}>Delete this poll</Button>
                        </Box>

                        <Modal isOpen={deleteModalOpen} onClose={() => {setDeleteModalOpen(false)}}>
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader>Are you sure you want to delete this poll?</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text>This action cannot be undone.</Text>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme="red" mr={3} onClick={deletePoll}>
                                    Delete
                                </Button>
                                <Button variant="ghost" onClick={() => {setDeleteModalOpen(false)}}>Cancel</Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </>
                }
            </Stack>
        </Container>
    ) : (
        <Container maxW="container.sm" p={8}>
            <Center>
                <Text>Loading...</Text>
            </Center>
        </Container>
  ))
}

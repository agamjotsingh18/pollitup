import React from 'react';

import { 
    Container,
    Box,
    Flex,
    Stack,
    Heading,
    Avatar,
    Input,
    Textarea,
    Text, 
    Button,
    useToast,
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton,
    SimpleGrid,
    //UnorderedList
} from "@chakra-ui/react";

import 'firebase/auth';
import { useAuth } from '../lib/auth';
import { addDoc, getDoc, getUserDocs } from '../lib/db';
import { useParams } from 'react-router-dom'
//import { FaBorderNone } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Poll from "../components/poll";

export default function Profile(props){
    const { user, loadingUser } = useAuth();
    const [userDoc, setUserDoc] = React.useState();
    const { uid } = useParams()

    const [edit, setEdit] = React.useState(false);
    const [displayName, setDisplayName] = React.useState(''); //get from firebase
    const [desc, setDesc] = React.useState("");
    const [showIconModal, setShowIconModal] = React.useState(false);
    const [pfpLink, setPfpLink] = React.useState('');
    const [polls, setPolls] = React.useState([]);
    const toast = useToast()

    React.useEffect(() => {
        //if (!user && !loadingUser) return window.location.href = '/login';
        //if (!user || loadingUser) return;

        async function checkUserDoc() {
            try{
                const userData = await getDoc('users', uid ?? user.uid);
                if (!userData) {
                    await addDoc('users', {
                        displayName: "",
                        description: "",
                        logo: ""
                    }, user.uid);
                    setUserDoc({
                        displayName: "",
                        description: "",
                        logo: ""
                    });
                    setDisplayName("");
                    setDesc("");
                    setPfpLink("");
                } else {
                    setUserDoc(userData);
                    setDisplayName(userData.displayName);
                    setDesc(userData.description);
                    setPfpLink(userData.logo);
                }
                const userDocs = await getUserDocs('polls', uid ?? user.uid);
                setPolls(userDocs);
            }
            catch{
                toast({
                    title: "Error",
                    description: "User does not exist!",
                    status: "error",
                    isClosable: true 
                })
            }
        }


        checkUserDoc();
    }, [user, loadingUser, uid, toast]);

    async function saveData(){

        setEdit(false);

        const newDoc = {
            ...userDoc,
            displayName,
            description: desc
        };
        delete newDoc.id;
        await addDoc('users', newDoc, user.uid);
        setUserDoc({ ...userDoc, displayName, description: desc });
    }

    async function savePfpLink(){
        setShowIconModal(false);
        const newDoc = {
            ...userDoc,
            logo: pfpLink
        };
        delete newDoc.id;
        await addDoc('users', newDoc, user.uid);

        setUserDoc({ ...userDoc, logo: pfpLink });
    }

    function handleDispChange(e){
        if (e.target.value.length < 18){
            setDisplayName(e.target.value);
        }
        else{
            toast({
                title: "Display name can only be 12 characters long",
                status: "error",
                isClosable: true,
              })
        }
    }

    function handleDescChange(e){
        setDesc(e.target.value);
    }

    let share = () => {
        let copyText = "https://www.pollitup.ink/profile/" + user.uid;
        
        

        try {
            navigator.clipboard.writeText(copyText);

            toast({
                title: "Copied to Clipboard",
                description: "The sharing link is copied to clipboard",
                status: "success",
                isClosable: true,
            })
        }
        catch{
            toast({
                title: "Error",
                description: "Error copying to clipboard",
                status: "error",
                isClosable: true,
            })
        }
    }

    return (
        <Container maxW="container.lg" align="center">

            <Modal isOpen={showIconModal} onClose={()=>setShowIconModal(false)}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Change Logo URL</ModalHeader>
                <ModalCloseButton />
                    <ModalBody>
                        <Box p={4} align="center">
                            <Avatar size="xl" src={pfpLink}/>
                        </Box>
                        <Input placeholder="Logo URL" value={pfpLink} onChange={(e)=>setPfpLink(e.target.value)} />
                    </ModalBody>
    
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={savePfpLink}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Heading align="center" m={12}>{uid === undefined ? "Your " : ""}Profile</Heading>
            <Container maxW='container.sm'>
                <Stack p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Flex justify>
                        <Box p={4}>
                            <Avatar size="xl" src={userDoc ? userDoc.logo : ""} onClick={()=>setShowIconModal(true)} />
                        </Box>
                        <Stack flex={1} m={4}>
                            <Stack direction={{ base: "column", md: "row" }}>
                                <Box w={{ base: "100%", md: "50%" }} m={2}>
                                    <Text align="left">Display name</Text>
                                </Box>
                                <Input value={displayName} placeholder="Display name" disabled={!edit} onChange={(e)=>handleDispChange(e)} />
                            </Stack>
                            <Stack direction={{ base: "column", md: "row" }}>
                                <Box w={{ base: "100%", md: "50%" }} m={2}>
                                    <Text align="left">Description</Text>
                                </Box>
                                <Textarea value={desc} placeholder="Description" rows="3" disabled={!edit} onChange={(e)=>handleDescChange(e)} />
                            </Stack>
                        </Stack>
                    </Flex>
                    <Flex justify="space-between">
                        {((!loadingUser) && ((uid === user?.uid) || (uid === undefined)))&& 
                            <>
                                
                                <Button colorScheme="gray" leftIcon={<FontAwesomeIcon icon={faEdit}/>} onClick={()=>setEdit(true)}>Edit</Button>
                                <Button colorScheme="blue" onClick={saveData}>Save</Button>
                                <Button colorScheme="gray" variant="solid" onClick = {share} leftIcon={<FontAwesomeIcon icon={faShareAlt}/>}>Share</Button>

                            </>
                        }
                    </Flex>
                </Stack><br/>
            </Container>
            
            <Container maxW="container.lg" my={4}>
                <Heading size="lg" align = "left" fontWeight="bold">Polls</Heading>
                <SimpleGrid p={4} columns={{ base: 0, md: 2, lg: 4 }} spacing={6}>
                    {polls && polls.map(poll => 
                        <Poll name={poll.name} description={poll.description} data={poll} />
                    )}
                </SimpleGrid>
            </Container>
        </Container>
    )
}

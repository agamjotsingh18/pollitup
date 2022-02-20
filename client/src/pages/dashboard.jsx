import React from 'react';
import Poll from "../components/poll";

import initFirebase from '../lib/firebase';
import 'firebase/auth';
import { useAuth } from '../lib/auth';
import { addDoc, getDoc, getUserDocs } from '../lib/db';

import { 
    Container,
    Heading,
    SimpleGrid,
} from "@chakra-ui/react";

export default function Dashboard() {
    initFirebase();
    const { user, loadingUser } = useAuth();

    const [polls, setPolls] = React.useState();
    
    React.useEffect(() => {
        //if (!user && !loadingUser) return window.location.href = '/login';
        if (!user) return;

        async function checkUserDoc() {
            const userData = await getDoc('users', user.uid);
            if (!userData || loadingUser) {
                await addDoc('users', {
                    displayName: "",
                    description: "",
                    logo: ""
                }, user.uid);
            }
        }
        checkUserDoc();

        async function getPolls() {
            const userDocs = await getUserDocs('polls', user.uid);
            setPolls(userDocs);
        }
        getPolls();
    }, [user, loadingUser]);

    return (
        <Container maxW="container.lg">
            <Heading as="h1" mt={12} align="center">Dashboard</Heading><br/>

            <Heading size="lg" fontWeight="bold">My Polls</Heading>
            <SimpleGrid p={8} columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                {polls && polls.map(poll => 
                    <Poll name={poll.name} description={poll.description} data={poll} />
                )}
            </SimpleGrid>
        </Container>
    )
}

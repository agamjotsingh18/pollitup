import React from 'react';
import { Box } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Stack, Flex, Center, } from "@chakra-ui/react"

import Pollpopup from './pollPopup';

export default function Poll(props){

    const [showModal, setShowModal] = React.useState(false);
    const [votes, setVotes] = React.useState(Math.floor(Math.random()*5)); //replce with prop
    const [hasVoted, setVoted] = React.useState('');

    function upVote(){
        if (hasVoted==='down'){
            setVotes(votes+2);
            setVoted('up');
        }
        else if (hasVoted===''){
            setVotes(votes+1);
            setVoted('up');
        }
        else{
            setVotes(votes-1);
            setVoted('')
        }
    }

    function downVote(){
        if (hasVoted==='up'){
            setVotes(votes-2);
            setVoted('down');
        }
        else if (hasVoted===''){
            setVotes(votes-1);
            setVoted('down');
        }
        else{
            setVotes(votes+1);
            setVoted('')
        }
    }

    return (
        <Box px={8} py={{ base: 12, lg: 8 }} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Stack direction="column" spacing={4}>
                <Flex>
                    {props.pollvoting && 
                        <Stack direction="column" pr={6}>
                            <ChevronUpIcon onClick={upVote} color={hasVoted==="up" && "green"} />
                            <Text ml=".2vw">{votes}{/*props.upvotes*/}</Text>
                            <ChevronDownIcon onClick={downVote} color={hasVoted==="down" && "red"} />
                        </Stack>
                    }
                    <Center flex={1}>
                        <Box align="left">
                            <Heading as="h6" size="md">{props.name}</Heading>
                            <Text>{props.description}</Text>
                        </Box>
                    </Center>
                </Flex>
                <Button colorScheme="red" onClick={()=>setShowModal(true)} isFullWidth={true}>Open Poll</Button>
            </Stack>
            
            {showModal && <Pollpopup set={setShowModal} data={props.data} />}
        </Box>
    )
}


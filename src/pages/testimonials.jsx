// For Testimonials
import React, { useEffect, useState } from 'react';

import {
    Container,
    Box,
    chakra,
    Flex,
    Text,
    Stack,
    Avatar,
    Icon,
    SimpleGrid,
    useDisclosure,
} from '@chakra-ui/react';

// For Modal
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    Textarea,
    Input,
} from '@chakra-ui/react'
import { FaQuoteRight } from 'react-icons/fa';
import { db, getCol } from '../lib/db';


const Testimonials = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async ()=> {
            setTestimonials(await getCol("testimonials"))
        }
        fetchTestimonials()
    }, [])
    

    const addReview = async () => {
        const response = await db.collection("testimonials").add({ name, review });
        const documentId = response.id;
        const document = await db.collection("testimonials").doc(documentId).get();
        const data = document.data();
        setTestimonials([...testimonials, data]);
        onClose()
    }

    return (
        <Container maxW="5xl" py={10} px={6} display="flex" flexDirection="column" >
            <Flex justify="center" mb={8}>
                <chakra.h3 fontSize="3xl" fontWeight="bold" mb={3} textAlign="center">
                    What people are saying about Us
                </chakra.h3>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2 }} placeItems="center" spacing={1} mt={12} mb={10}>
                {testimonials.map((obj, index) => (
                    <Stack
                        key={index}
                        direction={{ base: 'column', sm: 'column' }}
                        spacing={2}
                        mb={5}
                        justify="center"
                        alignItems="center"
                        border="1px"
                        borderColor="gray.400"
                    >
                        <Icon mt={4} as={FaQuoteRight} w={8} h={8} color="blue.600" />
                        <Stack
                            maxW="345px"
                            boxShadow="lg"
                            rounded="md"
                            p={5}
                            pos="relative"
                            textAlign="center"
                            _after={{
                                content: `""`,
                                w: '0',
                                h: '0',
                                borderColor: `transparent transparent`,
                                borderStyle: 'solid',
                                borderWidth: '10px 0 10px 10px',
                                position: 'absolute',
                                top: { base: 'unset', sm: '45%' },
                                right: { base: 'unset', sm: '-10px' },
                                left: { base: '48%', sm: 'unset' },
                                bottom: { base: '-15px', sm: 'unset' },
                                transform: { base: 'rotate(90deg)', sm: 'unset' },
                                display: 'block'
                            }}
                        >
                            <Text fontWeight="medium" fontSize="sm">
                                {obj.review}
                            </Text>
                        </Stack>
                        <Stack direction="column" spacing={2} p={2} justifyContent="center" alignItems="center">
                            <Box textAlign="center">
                                <Text fontWeight="bold" fontSize="md">
                                    {obj.name}
                                </Text>
                            </Box>
                        </Stack>
                    </Stack>
                ))}
            </SimpleGrid>




            {/* Modal Component */}
            <Button onClick={onOpen} width="50%" ml="25%" color="blue.400" fontWeight="bold">Write Your Review</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Your Review</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input ref={initialRef} placeholder='Name' onChange={(e) => setName(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <Textarea placeholder='Add Your Review' onChange={(e) => setReview(e.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={addReview}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default Testimonials;



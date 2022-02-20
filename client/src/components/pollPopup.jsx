import React from 'react';
import { Link } from 'react-router-dom';
import publicIp from 'public-ip';

import initFirebase from '../lib/firebase';
import { addSubDoc } from '../lib/db';

import { 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton, 
    FormControl, 
    Stack, 
    Radio, 
    RadioGroup, 
    Checkbox, 
    CheckboxGroup, 
    Button,
    Input,
    Text,
    useToast,
} from "@chakra-ui/react";

export default function PollPopup(props){
    initFirebase();
    const toast = useToast();

    const [ open, setOpen ] = React.useState(true);
    const canViewPollResults = true; // always visible for now
    const [formOptions, setForm] = React.useState(props.data.choices?.map(choice=>({'name':choice, 'selected':false})));
    const [inputValue, setInputValue] = React.useState("");
    const checkboxes = props.data.selectMultiple;
    const type = props.data.type;

    function handleClose(){
        props.set(false);
        setOpen(false);
    }

    function handleClick(e){
        if (type === 'multipleChoice' && checkboxes) {
            const changedOption = formOptions.filter(option=>option.name===e.target.value)[0]
            setForm(formOptions.map(option=>({"name":option.name, "selected":option.name===changedOption.name?!changedOption.selected:option.selected})))
        } else if (type === 'multipleChoice' && !checkboxes) {
            setForm(formOptions.map(option=>({"name":option.name, "selected":option.name===e.target.value?true:false}))) //make them all unclicked
        }
    }

    async function handleSubmit(){
        const answer = type === 'multipleChoice' ? formOptions.map(answer => answer.selected) : inputValue;

        if ((type === 'multipleChoice' && !answer.includes(true)) || (type === 'text' && inputValue.trim() === '')) {
            return toast({
                title: "Invalid submission",
                description: "Your submission is invalid!",
                status: "error",
                isClosable: true
            });
        }

        handleClose();
        //Send the form options state here, has which options the user picked
        const ip = await publicIp.v4({
            fallbackUrls: ['https://ifconfig.co/ip']
        });
        await addSubDoc('polls', props.data.id, 'responses', {
            ip,
            answer
        });

        toast({
            title: "Response saved",
            description: "Your response has been saved!",
            status: "success",
            isClosable: true
        });
    }


    return (
        <Modal isOpen={open} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>
                {props.data.question}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {/*props.data.form*/}
                <Text mb={4}>{props.data.description}</Text>
                <FormControl as="fieldset">
                    {type === 'multipleChoice' ?
                        checkboxes ? 
                            /* CHECKBOX */
                            <CheckboxGroup>
                                <Stack direction="column" spacing={2}>
                                    {formOptions.map(option=><Checkbox value={option.name} isChecked={option.selected} onChange={(e)=>handleClick(e)}>{option.name}</Checkbox>)}
                                </Stack>
                            </CheckboxGroup >
                        :
                        /* RADIO GROUP */
                        <RadioGroup>
                            <Stack direction="column"  spacing={2}>
                                {formOptions.map(option=><Radio value={option.name} isChecked={option.selected} onChange={(e)=>handleClick(e)}>{option.name}</Radio>)}
                            </Stack>
                        </RadioGroup>
                    :
                        /* INPUT */
                        <Input value={inputValue} onChange={e => setInputValue(e.target.value)} autoComplete="off"/>
                    }
                    
                </FormControl>
            </ModalBody>

                <ModalFooter>
                    { canViewPollResults && <Link to={`poll/${props.data.id}`} ><Button colorScheme="green" mr={3} onClick={handleClose}>
                        View Poll Results
                    </Button></Link>}
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
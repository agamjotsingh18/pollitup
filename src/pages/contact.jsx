import React, { useState } from "react";
import {
  Center,
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  VStack,
  Textarea,
  Box,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Contact() {
  //let data = React.useState({name: "", email: "", message: ""})

  //   const [input, setInput] = useState("");

  //   const handleInputChange = (e) => setInput(e.target.value);

  //   const isError = input === "";\\

  const form = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      mobile_number: "",
      message: "",
    },

    validationSchema: Yup.object({
      first_name: Yup.string()
        .required("First name required")
        .max(10, "Must be 15 characters or less")
        .min(3, "Must be 3 characters or more"),
      last_name: Yup.string()
        .required("Last name required")
        .max(10, "Must be 15 characters or less")
        .min(3, "Must be 3 characters or more"),

      email: Yup.string()
        .required("Email required")
        .email("Invalid email address"),
      mobile_number: Yup.number()
      .required("Mobile number required"),
      message: Yup.string()
        .required("Message required")
        .min(10, "Must be 10 characters or more")
        .max(100, "Must be 100 characters or less"),
    }),
    onSubmit: (values, actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });
  return (
    <Container maxW={"container.xl"}>
      <VStack w={"full"} spacing={5}>
        <Heading>Contact Us</Heading>

        <Box
          p={8}
          maxWidth={"80vw"}
          w={"full"}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <VStack
            as={"form"}
            spacing={5}
            w={"full"}
            onSubmit={form.handleSubmit}
          >
            <HStack w={"full"}>
              <FormControl isInvalid={form.errors.first_name}>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="first_name"
                  placeholder="enter your first name..."
                  colorScheme="dark"
                  onChange={form.handleChange}
                  value={form.values.first_name}
                />
                <FormErrorMessage>{form.errors.first_name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={form.errors.last_name}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="last_name"
                  type="text"
                  placeholder="enter your last name..."
                  onChange={form.handleChange}
                  value={form.values.last_name}
                />
                <FormErrorMessage>{form.errors.last_name}</FormErrorMessage>
              </FormControl>
            </HStack>
            <FormControl isInvalid={form.errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                onChange={form.handleChange}
                value={form.values.email}
                placeholder="xyz@email.com"
              />
              <FormErrorMessage>{form.errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={form.errors.mobile_number}>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                type="tel"
                name="mobile_number"
                placeholder="Ph. number"
                onChange={form.handleChange}
                value={form.values.mobile_number}
              />
              <FormErrorMessage>{form.errors.mobile_number}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={form.errors.message}>
              <FormLabel>Your Message</FormLabel>
              <Textarea
                name="message"
                onChange={form.handleChange}
                value={form.values.message}
                placeholder="enter your message..."
              />
              <FormErrorMessage>{form.errors.message}</FormErrorMessage>
            </FormControl>
          </VStack>
          <Button
            w={"full"}
            onClick={form.handleSubmit}
            colorScheme="teal"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </VStack>
    </Container>
  );
}

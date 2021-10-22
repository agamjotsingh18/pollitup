import { Button, FormControl, FormLabel, Input, Stack, } from '@chakra-ui/react'
import * as React from 'react'
import { PasswordField } from './passwordField'

export const RegisterForm = (props) => {
  return (
      <Stack spacing="6">
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input value={props.email} onChange={e => props.setEmail(e.target.value)} name="email" type="email" autoComplete="off" required />
        </FormControl>
        <PasswordField password = {props.password} setPassword = {props.setPassword} />
        <PasswordField label="Confirm Password" password = {props.password2} setPassword = {props.setPassword2} />
        <Button type="submit" colorScheme="blue" size="lg" fontSize="md" onClick = {props.signUp}>
          Register
        </Button>
      </Stack>

  )
}
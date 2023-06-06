import { Button, FormControl, FormLabel, Input, Stack, Link} from '@chakra-ui/react'
import * as React from 'react'
import { PasswordField } from './passwordField'

export const LoginForm = (props) => {
  return (
      <Stack spacing="6">
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input value={props.email} onChange={e => props.setEmail(e.target.value)} name="email" type="email" autoComplete="off" required />
        </FormControl>
        <PasswordField password = {props.password} setPassword = {props.setPassword} />
	<Link href="/forgot-password" fontSize="sm" style={{position : "relative" , textAlign : "right" }} > Forgot password? </Link>
        <Button type="submit" colorScheme="blue" size="lg" fontSize="md" onClick = {props.signIn}>
          Log in
        </Button>
      </Stack>

  )
}

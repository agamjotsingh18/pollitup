import { Button, FormControl, FormLabel, Input, Stack, } from '@chakra-ui/react'
import * as React from 'react'
import { PasswordField } from './passwordField'
import Captcha from './captcha';

export const RegisterForm = (props) => {
  const [trackState, setTrackState] = React.useState(false);
  return (
      <Stack spacing="6">
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input value={props.email} onChange={props.change} name="email" type="email" autoComplete="off" required />
          {(props.errorObj.email && props.errorObj.emailError)? <p className='error'>{props.errorObj.emailError}</p>:null}
        </FormControl>
        <PasswordField id="password" value = {props.password} onChange={props.change} name="password"/>
        {(props.errorObj.password && props.errorObj.passwordError)? <p style={{textAlign: "center"}}  className='error'>{props.errorObj.passwordError}</p>:null}
        <PasswordField id="password2" label="Confirm Password" value = {props.password2}  onChange = {props.change} name="password2"/>
        {(props.errorObj.password2 && props.errorObj.password2Error)? <p className='error'>{props.errorObj.password2Error}</p>:null}
        <Captcha message={setTrackState} trackState={trackState}/>
        <Button type="submit" disabled={!trackState}
              style={{cursor:`${trackState ? "pointer": "not-allowed"}`}} colorScheme="blue" size="lg" fontSize="md" onClick = {props.signUp}>
          Register
        </Button>
      </Stack>

  )
}

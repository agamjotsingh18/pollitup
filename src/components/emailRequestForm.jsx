import { Button, FormControl, FormLabel, Input, Stack, Link} from '@chakra-ui/react'
import { unstable_HistoryRouter, useHistory} from 'react-router-dom';
import * as React from 'react'


function EmailRequestForm(props) {
	const history = unstable_HistoryRouter();
	function handleSubmit(event) {
		event.preventDefault();
		props.handleResetPassword();
		history.push("/email-sent");
	}
		
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="6">
	<FormControl id="email"  >
	  <FormLabel>Email address</FormLabel>
	  <Input name="email" type="email" autoComplete="email" required />
	</FormControl>
	<Button type="submit" colorScheme="blue" size="lg" fontSize="md" >
	 Send Password Reset Link
	</Button>
      </Stack>
    </form>
  )
}

export default EmailRequestForm;

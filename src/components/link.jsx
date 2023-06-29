import React from 'react';
import { Link as RLink } from 'react-router-dom';

import {
  Link as ChakraLink,
  Tooltip,
} from '@chakra-ui/react';

export default function Link(props) {
  const { href, children, tooltip, noUnderline, ...rest } = props;

  return (
    <>
      {tooltip ? 
        <Tooltip label={tooltip}>
          <RLink to={href} style={ noUnderline ? { textDecoration: "none" } : {}} {...rest}>
            <ChakraLink>{children}</ChakraLink>
          </RLink>
        </Tooltip> 
      : 
        <RLink to={href} style={ noUnderline ? { textDecoration: "none" } : {}} {...rest}>
          <ChakraLink>{children}</ChakraLink>
        </RLink>
      }
    </>
  )
}
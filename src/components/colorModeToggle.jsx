import React from 'react';
import { useColorMode, IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export default function ColorModeToggle(props) {
  const { ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === 'light' ? <SunIcon/> : <MoonIcon/>}
      onClick={toggleColorMode}
      {...rest}
    />
  )
}

import React from "react"
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react"
import { MoonStars, Sun } from "phosphor-react"

export const ColorModeSwitcher = (
  props: Omit<IconButtonProps, "aria-label">,
) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(MoonStars, Sun)

  return (
    <IconButton
      {...props}
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      size="md"
      fontSize="lg"
    />
  )
}
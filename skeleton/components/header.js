import React from 'react'
import { useColorMode } from 'theme-ui'
import { Button } from 'rebass'

export default function Header() {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <header>
      <Button
        sx={{
          m: 4,
          ":hover": {
            backgroundColor: "tomato"
          }
        }}
        onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </header>
  )
}

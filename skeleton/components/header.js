import { useState } from "react";
import { Button } from "rebass";

const Header = ({ setCurrentTheme = Function.prototype }) => {
  const [colorMode, setColorMode] = useState("dark");
  return (
    <header>
      <Button
        sx={{
          m: 4,
          ":hover": {
            backgroundColor: "tomato"
          }
        }}
        onClick={() => {
          const nextMode = colorMode === "light" ? "dark" : "light";
          setColorMode(nextMode);
          setCurrentTheme(nextMode);
        }}
      >
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </header>
  );
};

export default Header;

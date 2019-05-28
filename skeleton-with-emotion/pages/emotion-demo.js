import { css } from "@emotion/core";
import styled from "@emotion/styled";

const Button = styled('button')`
padding: 10px;
border-radius: 3px;
background-color: khaki;
`

const mainCss = css`
font-family: sans-serif;
`

export default () => (
  <main css={mainCss}>
    <Button>just a button</Button>
  </main>
);

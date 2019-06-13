import { css } from "@emotion/core";
import styled from "@emotion/styled";

const H1 = styled('h1')`
font-family: sans-serif;
`

const H2 = styled(H1)`
color: #d36ac2;
`.withComponent('h2')

const mainCss = css`
padding: 24px;
text-align: center;
`

const Header = () => (
  <header css={mainCss}>
    <H1>Next.js Example on Now 2.0</H1>
    <H2>with emotion :)</H2>
  </header>
);

export default Header;

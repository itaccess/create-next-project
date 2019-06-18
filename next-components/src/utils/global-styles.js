/** @jsx jsx */
import { jsx, css, Global } from "@emotion/core";

const globalStyles = theme => css`
@import url("https://fonts.googleapis.com/css?family=${theme.fontFamily.replace(/ /g, '+').replace(/"/g, '')}");
html, body {
  margin: 0;
  padding: 0;
}
`
const GlobalStyles = () => <Global styles={globalStyles} />;

export default GlobalStyles;

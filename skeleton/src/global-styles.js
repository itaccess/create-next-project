/** @jsx jsx */
import { jsx, css, Global } from "@emotion/core";

const globalStyles = theme => css`
@font-face {
    font-family: 'Bw Paraform';
    src: url('/static/fonts/BWParaform-LightItalic.woff2') format('woff2'),
        url('/static/fonts/BWParaform-LightItalic.woff') format('woff');
    font-weight: 300;
    font-style: italic;
}

@font-face {
    font-family: 'Bw Paraform';
    src: url('/static/fonts/BWParaform-Light.woff2') format('woff2'),
        url('/static/fonts/BWParaform-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
}

@font-face {
    font-family: 'Bw Paraform';
    src: url('/static/fonts/BWParaform-ExtraBoldItalic.woff2') format('woff2'),
        url('/static/fonts/BWParaform-ExtraBoldItalic.woff') format('woff');
    font-weight: 800;
    font-style: italic;
}

@font-face {
    font-family: 'Bw Paraform';
    src: url('/static/fonts/BWParaform-ExtraBold.woff2') format('woff2'),
        url('/static/fonts/BWParaform-ExtraBold.woff') format('woff');
    font-weight: 800;
    font-style: normal;
}

html, body {
  margin: 0;
  padding: 0;
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
}
`
const GlobalStyles = () => <Global styles={globalStyles} />;

export default GlobalStyles;

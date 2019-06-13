import Document, { Head, Main, NextScript } from "next/document";
const manifest = require("../static/manifest.json");

const HTML_TITLE = manifest.short_name;
const META_DESCRIPTION = manifest.name;
const THEME_COLOR = manifest.theme_color;
const SHORTCUT_ICON = manifest.icons[0].src;

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <title>{HTML_TITLE}</title>
          <meta name="theme-color" content={THEME_COLOR} />
          <meta name="Description" content={META_DESCRIPTION} />
          <link rel="shortcut icon" href={SHORTCUT_ICON} type="image/x-icon" />
          <link rel="manifest" href="/static/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

import Document, { Head, Main, NextScript } from "next/document";
const manifest = require("../static/manifest.json");

const HTML_TITLE = manifest.short_name;
const META_DESCRIPTION = manifest.name;
const THEME_COLOR = manifest.theme_color;
const SHORTCUT_ICON = manifest.icons[0].src;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // pull emotion style tags out of html, and return it's data as styleTags prop
    const page = renderPage();
    const styleTags = [];

    page.html = page.html.replace(
      /<style data-emotion-css="([^"]+)">(.+?)<\/style>/g,
      (all, id, content) => {
        styleTags.push(
          <style
            key={id}
            data-emotion-css={id}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
        return "";
      }
    );

    return {
      ...page,
      styleTags
    };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charset="UTF-8" />
          <title>{HTML_TITLE}</title>
          <meta name="theme-color" content={THEME_COLOR} />
          <meta name="Description" content={META_DESCRIPTION} />
          <link rel="shortcut icon" href={SHORTCUT_ICON} type="image/x-icon" />
          <link rel="manifest" href="/static/manifest.json" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

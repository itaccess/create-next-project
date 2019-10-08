import { useState } from "react";
import Error from "next/error";
import { css, Global } from "@emotion/core";
import model from "../app/model";
import Header from "../components/header";
import { sections as sectionsLocal } from "../components";
import { sections as sectionsLibrary } from "next-components";
import { default as appTheme } from "../app/theme";
import { default as rebassTheme } from "@rebass/preset";
import { ThemeProvider } from "emotion-theming";
import { Heading, Button } from "rebass";

const theme = { ...rebassTheme, ...appTheme };

const jsonCopy = serializableObject =>
  JSON.parse(JSON.stringify(serializableObject));

const sections = { sectionsLocal, sectionsLibrary };

const globalStyles = css`
  html,
  body {
    margin: 0;
    padding: 0;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
  }
`;

const modelToViewName = modelName =>
  modelName.replace(/^([a-z])/, (x, first) => first.toUpperCase());

const Page = ({ slug, routeData, siteData }) => {
  console.log(routeData);
  console.log(siteData);
  console.log(theme);

  const darkTheme = jsonCopy(theme);
  darkTheme.colors.primary = "red";
  darkTheme.colors.background = theme.colors.text;
  darkTheme.colors.text = theme.colors.background;

  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  // if (siteData.globalFont) {
  //   theme.fonts.body = siteData.globalFont;
  // }

  return routeData ? (
    <ThemeProvider theme={currentTheme}>
      <Global styles={globalStyles} />
      <Header
        setCurrentTheme={colorMode =>
          colorMode === "light"
            ? setCurrentTheme(theme)
            : setCurrentTheme(darkTheme)
        }
      />
      <Button>asdasd</Button>
      <Button variant="secondary" mr={2}>
        Secondary
      </Button>
      <Heading>{routeData.page.title}</Heading>
      {routeData.page.content.map((section, index) => {
        const sectionName = modelToViewName(section._type);

        if (sections[sectionName]) {
          const Section = sections[sectionName];
          return (
            <section key={index}>
              <Section {...section} />
            </section>
          );
        }
      })}
    </ThemeProvider>
  ) : (
    <Error statusCode={404} />
  );
};

Page.getInitialProps = async ({ query: { slug }, res }) => {
  const { routeData, siteData } = await model.getAllData(slug);

  if (res) {
    // https://github.com/zeit/next.js/issues/746#issuecomment-305075299
    if (!routeData) {
      res.statusCode = 404;
    } else {
      const etag = require("crypto")
        .createHash("md5")
        .update(JSON.stringify([routeData, siteData] || ""))
        .digest("hex");

      res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
      res.setHeader("X-version", etag);
    }
  }

  return { slug, routeData, siteData };
};

export default Page;

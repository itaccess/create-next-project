import Error from "next/error";
import { css } from "@emotion/core";
import model from "../app/model";
import { ThemeProvider, Styled, ColorMode } from "theme-ui";
import Header from "../components/header";
import { Theme, GlobalStyles } from "../src";
import { sections as sectionsLibrary } from "next-components";
import { Text } from "rebass";

const sections = {sectionsLibrary};

const modelToViewName = modelName =>
  modelName.replace(/^([a-z])/, (x, first) => first.toUpperCase());

const Page = ({ slug, routeData, siteData }) => {
  console.log(routeData);
  console.log(siteData);

  const theme = Theme;
  if (siteData.globalFont) {
    theme.fontFamily = siteData.globalFont;
  }

  return routeData ? (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ColorMode />
      <Header />
      <Styled.root>
        <Text
          as="h1"
          css={css`
            text-align: center;
          `}
        >
          {routeData.page.title}
        </Text>
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
      </Styled.root>
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

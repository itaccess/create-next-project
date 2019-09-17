import Error from "next/error";
import Link from "next/link";
import { css } from "@emotion/core";
import model from "../app/model";
import Header from "../components/header";
import Form from "../components/form";
import { Text } from "next-components/dist/atoms";
import { sections, GlobalStyles, ThemeProvider } from "next-components";

const modelToViewName = modelName =>
  modelName.replace(/^([a-z])/, (x, first) => first.toUpperCase());

const Page = ({ slug, routeData, siteData }) => {
  console.log(routeData);
  console.log(siteData);

  const theme = {};
  if (siteData.globalFont) {
    theme.fontFamily = siteData.globalFont;
  }

  return routeData ? (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Form />
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

import App, { Container } from "next/app";
import Head from "next/head";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";
import Nav from "../components/Nav";
import { title } from "./_document";

const Main = styled.main`
  margin: 0 auto;
  max-width: var(--max-width);
  padding: var(--padding);
`;

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    <Global
      styles={css`
        :root {
          --padding: 2rem;
          --max-width: 50rem;
        }

        body {
          background: var(--background--1);
          font-family: "PT Sans", sans-serif;
          margin: 0;
        }
      `}
    />;

    const { Component, pageProps, router } = this.props;

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <Container>
          <Nav />
          <Main>
            <Component {...pageProps} router={router} />
          </Main>
        </Container>
      </>
    );
  }
}

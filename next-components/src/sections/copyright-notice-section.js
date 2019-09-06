/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Text, Box, Heading, Button } from "rebass";

const Card = styled(Box)({
  borderRadius: "4",
  border: "1px solid #f6f6f6",
  boxShadow: "0 2px 4px rgba(0, 0, 0, .125)",
  textAlign: "center"
});

const Section = ({ copyrightNotice }) => (
  <Card
    sx={{
      maxWidth: 512,
      my: "100px",
      mx: "auto",
      p: 3,
      color: "text",
      bg: "background",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body"
    }}
  >
    <Heading color="pink" variant="heading">Next.js Styled with Emotion with Rebass :)</Heading>
    <Text mb={4}>{copyrightNotice}</Text>
    <Button variant='primary' mr={2}>Primary</Button>
    <Button variant='secondary' mr={2}>Secondary</Button>

    <Button variant='outline' mr={2}>Outline</Button>

  </Card>
);

export default Section;

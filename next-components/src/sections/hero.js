/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Box from 'mineral-ui/Box'
import Text from '../atoms/text'

const style = theme => css`
  color: ${theme.color_brandPrimary};
  background-color: black;
  padding-top: ${theme.space_inset_md};
  padding-bottom: ${theme.space_inset_md};
  text-align: center;
`;

const Section = ({ heading }) => (
  <Box css={style}>
    <Text>{heading}</Text>
  </Box>
);

export default Section;

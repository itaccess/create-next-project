/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Box from 'mineral-ui/Box'
import Text from '../atoms/text'

const style = theme => css`
  color: ${theme.color_brandPrimary};
  background-color: ${theme.backgroundColor_brandPrimary};
  padding-top: ${theme.space_inset_md};
  padding-bottom: ${theme.space_inset_md};
  text-align: center;
`;

const Section = ({ copyrightNotice }) => (
  <Box css={style}>
    <Text>{copyrightNotice}</Text>
  </Box>
);

export default Section;

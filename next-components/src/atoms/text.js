/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { default as MineralText } from "mineral-ui/Text";

const Text = ({ as: asTag, appearance, ...props }) => {
  const [tagType, level] = appearance || asTag || "p";
  return (
    <MineralText
      noMargins
      css={theme => css`
        font-family: ${theme.fontFamily};
        * + & {
          margin-top: ${tagType === "h"
            ? theme.Text_marginTop_heading
            : theme.Text_marginTop};
          margin-bottom: 0;
        }
      `}
      as={asTag}
      appearance={appearance}
      {...props}
    />
  );
};

export default Text;
